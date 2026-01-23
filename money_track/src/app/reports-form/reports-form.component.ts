import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { AuditApplication } from '../../shared/interface/application.interface';
import { catchError, of, switchMap } from 'rxjs';
import { ReportService } from '../../shared/services/report.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    RouterLink,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reports-form.component.html',
  styleUrl: './reports-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReportsFormComponent implements OnInit, OnDestroy {
  reportsForm!: FormGroup;
  reportsTypeArray = [
    'Бухгалтерский баланс',
    'Отчет о финансовых результатах',
    'Отчет о движении денежных средств',
    'Налоговая отчетность',
  ];
  formWasChanged = signal<boolean>(false)
  updateForm!: Partial<AuditApplication>;
  reportsTypeValSignal = signal<string[]>([]);
  specialAuditValueSignal = signal<boolean>(false);
  InternationalOperationsValueSignal = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private subjectService: ReportService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.reportsForm.valueChanges.subscribe(() => {
      this.reportsTypeValSignal.set(this.reportsForm.get('selectedReportTypes')?.value);
      this.specialAuditValueSignal.set(this.reportsForm.get('specialAuditNeeded')?.value);
      this.InternationalOperationsValueSignal.set(
        this.reportsForm.get('hasInternationalOperations')?.value
      );

      this.formWasChanged.set(true);
    });
    this.reportsForm.controls['selectedReportTypes'].valueChanges.subscribe(a => {
      if (a && a.includes('Налоговая отчетность')) {
        this.reportsForm.get('taxSystem')?.enable();
        this.reportsForm.get('annualTaxReturn')?.enable();
        this.reportsForm.get('vatReturns')?.enable();
      } else if (a && !a.includes('Налоговая отчетность')) {
        this.reportsForm.get('taxSystem')?.reset();
        this.reportsForm.get('annualTaxReturn')?.reset();
        this.reportsForm.get('vatReturns')?.reset();
      }
    });
    this.reportsForm.controls['specialAuditNeeded'].valueChanges.subscribe(b => {
      if (b) {
        this.reportsForm.get('auditPurpose')?.enable();
        this.reportsForm.get('additionalAuditorsCount')?.enable();
      } else {
        this.reportsForm.get('auditPurpose')?.reset();
        this.reportsForm.get('additionalAuditorsCount')?.reset();
      }
    });
    this.reportsForm.controls['hasInternationalOperations'].valueChanges.subscribe(c => {
      if (c) {
        this.reportsForm.get('countriesOfOperation')?.enable();
        this.reportsForm.get('currencyOfTransactions')?.enable();
      } else {
        this.reportsForm.get('countriesOfOperation')?.reset();
        this.reportsForm.get('currencyOfTransactions')?.reset();
      }
    });

    this.subjectService.upReport.subscribe(upForm => {
      this.updateForm = upForm as Partial<AuditApplication>;
      if (upForm) {
        this.setFormValues(upForm);
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

  public TypeVal = computed(() => {
    if (!this.reportsTypeValSignal) {
      return false;
    }
    return this.reportsTypeValSignal().includes('Налоговая отчетность');
  });

  public addReports() {
    if (this.reportsForm.invalid) {
      this.reportsForm.markAllAsTouched();
      return;
    }
    this.backend
      .createApplication(this.reportsForm.value)
      .pipe(
        switchMap((postResponse: AuditApplication) => {
          if (postResponse._id) {
            return this.backend.submitApplication(postResponse._id, postResponse);
          } else {
            return of({});
          }
        })
      )
      .subscribe(() => {
        this.resetFormProperly();
      });
  }

  setFormValues(data: Partial<AuditApplication>) {
    this.reportsForm.patchValue(data);
  }

  // Метод для сброса формы
  private resetFormProperly() {
    this.reportsForm.reset({
      specialAuditNeeded: false,
      hasInternationalOperations: false,
      selectedReportTypes: [],
    });

    this.disableDynamicFields();

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

  ngOnDestroy(): void {
    if (!this.formWasChanged() && !this.reportsForm.dirty) {
      return;
    }
    if (this.updateForm._id) {
      this.subjectService.editChange(true);
      this.backend
        .updateApplication(this.updateForm._id, this.reportsForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.subjectService.editChange(false);
            console.log(error);

            return of(() => null);
          })
        )
        .subscribe(() => {
          this.subjectService.editChange(false);
        });
    } else {
      this.backend.createApplication(this.reportsForm.value).subscribe(() => {});
    }
  }
}
