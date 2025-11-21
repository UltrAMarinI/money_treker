const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Статус заявки: draft - черновик, submitted - отправлена, in_progress - в работе, completed - завершена
  status: { 
    type: String, 
    enum: ['draft', 'submitted', 'in_progress', 'completed'], 
    default: 'draft' 
  },
  
  // Статические поля
  applicationDate: { 
    type: Date, 
    default: Date.now 
  },
  companyName: { 
    type: String 
  },
  taxId: { 
    type: String 
  },
  reportingPeriod: { 
    type: String 
  },
  contactPerson: { 
    type: String 
  },
  contactPhone: { 
    type: String 
  },
  contactEmail: { 
    type: String 
  },

  // Поля-триггеры
  selectedReportTypes: [{ 
    type: String 
  }],
  specialAuditNeeded: { 
    type: Boolean, 
    default: false 
  },
  hasInternationalOperations: { 
    type: Boolean, 
    default: false 
  },

  // Динамические поля
  taxSystem: { 
    type: String 
  },
  annualTaxReturn: { 
    type: Boolean 
  },
  vatReturns: { 
    type: Boolean 
  },
  auditPurpose: { 
    type: String 
  },
  additionalAuditorsCount: { 
    type: Number 
  },
  countriesOfOperation: [{ 
    type: String 
  }],
  currencyOfTransactions: { 
    type: String 
  },

  // Метаданные
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  submittedAt: { 
    type: Date 
  }
});

// Обновляем updatedAt перед сохранением
ApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Application', ApplicationSchema);