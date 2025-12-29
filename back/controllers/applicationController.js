const Application = require("../models/Application");

// Получение всех заявок пользователя (включая черновики)
exports.getApplications = async (req, res, next) => {
  try {
    const { status } = req.query; // Опциональный фильтр по статусу
    const filter = { userId: req.userId };

    if (status) {
      filter.status = status;
    }

    const applications = await Application.find(filter).sort({ updatedAt: -1 });
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

// Получение конкретной заявки по ID
exports.getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await Application.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    next(err);
  }
};

// Создание новой заявки (можно создать пустой черновик)
exports.createApplication = async (req, res, next) => {
  try {
    const applicationData = {
      userId: req.userId,
      status: "draft",
      ...req.body,
    };

    const application = await Application.create(applicationData);
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
};

// Обновление заявки (для черновиков - любые поля, для отправленных - ограничения)
exports.updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Находим заявку и проверяем права доступа
    const existingApplication = await Application.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!existingApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Если заявка уже отправлена, ограничиваем редактирование
    if (existingApplication.status !== "draft") {
      return res.status(400).json({
        message: "Cannot update submitted application",
      });
    }

    const updatedApplication = await Application.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json(updatedApplication);
  } catch (err) {
    next(err);
  }
};

// Удаление заявки (только черновики)
exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Можно удалять только черновики
    if (application.status !== "draft") {
      return res.status(400).json({
        message: "Cannot delete submitted application",
      });
    }

    await Application.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Отправка черновика на проверку (меняет статус на submitted)
exports.submitApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.status !== "draft") {
      return res.status(400).json({
        message: "Application is already submitted",
      });
    }

    // Здесь можно добавить валидацию обязательных полей перед отправкой
    const requiredFields = [
      "companyName",
      "taxId",
      "reportingPeriod",
      "contactPerson",
    ];
    const missingFields = requiredFields.filter((field) => !application[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    const submittedApplication = await Application.findOneAndUpdate(
      { _id: id, userId: req.userId },
      {
        status: "submitted",
        submittedAt: Date.now(),
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.json({
      message: "Application submitted successfully",
      application: submittedApplication,
    });
  } catch (err) {
    next(err);
  }
};
