import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { BackendService } from '../../shared/services/backend';

@Component({
  selector: 'app-reports-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reports-form.component.html',
  styleUrl: './reports-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReportsFormComponent implements OnInit {
  reportsForm!: FormGroup;
  reportsTypeArray = [
    'Бухгалтерский баланс',
    'Отчет о финансовых результатах',
    'Отчет о движении денежных средств',
    'Налоговая отчетность',
  ];

  constructor(
    private fb: FormBuilder,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.reportsForm.controls['selectedReportTypes'].valueChanges.subscribe(a => {
      if (a && a.includes('Налоговая отчетность')) {
        this.reportsForm.get('taxSystem')?.enable();
        this.reportsForm.get('annualTaxReturn')?.enable();
        this.reportsForm.get('vatReturns')?.enable();
      }
    });
    this.reportsForm.controls['specialAuditNeeded'].valueChanges.subscribe(b => {
      if (b === true) {
        this.reportsForm.get('auditPurpose')?.enable();
        this.reportsForm.get('additionalAuditorsCount')?.enable();
      }
    });
    this.reportsForm.controls['hasInternationalOperations'].valueChanges.subscribe(c => {
      if (c === true) {
        this.reportsForm.get('countriesOfOperation')?.enable();
        this.reportsForm.get('currencyOfTransactions')?.enable();
      }
    });
  }

  private createForm() {
    this.reportsForm = this.fb.group({
      // Статические поля
      applicationDate: ['', Validators.required],
      companyName: ['', Validators.required],
      taxId: ['', Validators.required],
      reportingPeriod: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactPhone: ['', [Validators.required, Validators.minLength(11)]],
      contactEmail: ['', [Validators.required, Validators.email]],

      // Поля-триггеры
      selectedReportTypes: [[], Validators.required],
      specialAuditNeeded: [false, Validators.required],
      hasInternationalOperations: [false, Validators.required],

      // Динамические поля (могут быть undefined)
      taxSystem: [{ value: null, disabled: true }, Validators.required],
      annualTaxReturn: [{ value: null, disabled: true }, Validators.required],
      vatReturns: [{ value: null, disabled: true }, Validators.required],
      auditPurpose: [{ value: null, disabled: true }, Validators.required],
      additionalAuditorsCount: [{ value: null, disabled: true }, Validators.required],
      countriesOfOperation: [{ value: null, disabled: true }, Validators.required],
      currencyOfTransactions: [{ value: null, disabled: true }, Validators.required],
    });
  }

  //reportsTypeVal=signal(false);

  get reportsTypeValue(): boolean {
    const type: string[] = this.reportsForm.get('selectedReportTypes')?.value;
    if (type) {
      return type.includes('Налоговая отчетность');
    }
    return false;
  }

  get specialAuditValue(): boolean {
    const audit: boolean = this.reportsForm.get('specialAuditNeeded')?.value;
    return audit;
  }

  get InternationalOperationsValue() {
    const intOperation: boolean = this.reportsForm.get('hasInternationalOperations')?.value;
    return intOperation;
  }

  addReports() {
    if (this.reportsForm.invalid) {
      // Помечаем все контролы как touched чтобы показать ошибки
      this.markAllAsTouched();
      return;
    }

    this.backend.createApplication(this.reportsForm.value).subscribe(a => {
      console.log(a);
    });
    this.backend.getApplications().subscribe(a => {
      console.log(a);
    });

    console.log('Отправка данных:', this.reportsForm.getRawValue());

    // Правильный сброс формы
    this.resetFormProperly();
  }

  // Метод для сброса формы
  private resetFormProperly() {
    this.reportsForm.reset({
      // Устанавливаем начальные значения для required полей
      specialAuditNeeded: false,
      hasInternationalOperations: false,
      selectedReportTypes: [],
    });

    //  Отключаем динамические поля
    this.disableDynamicFields();

    // Сбрасываем состояния touched/dirty
    this.reportsForm.markAsPristine();
    this.reportsForm.markAsUntouched();

    // Сбрасываем все контролы
    Object.keys(this.reportsForm.controls).forEach(key => {
      const control = this.reportsForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }

  // Отключаем динамические поля после сброса
  private disableDynamicFields() {
    const dynamicFields = [
      'taxSystem',
      'annualTaxReturn',
      'vatReturns',
      'auditPurpose',
      'additionalAuditorsCount',
      'countriesOfOperation',
      'currencyOfTransactions',
    ];

    dynamicFields.forEach(field => {
      this.reportsForm.get(field)?.disable();
      this.reportsForm.get(field)?.setValue(null);
    });
  }

  // Помечаем все контролы как touched (для отображения ошибок)
  private markAllAsTouched() {
    this.reportsForm.markAllAsTouched();
  }

  //нужна функция сбрасывающая значения всплывающих полей если триггеры поменяли значение
}
