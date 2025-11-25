import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-reports-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reports-form.component.html',
  styleUrl: './reports-form.component.scss',
})
export class ReportsFormComponent {
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  reportsForm!: FormGroup;

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
      taxSystem: [null],
      annualTaxReturn: [null],
      vatReturns: [null],
      auditPurpose: [null],
      additionalAuditorsCount: [null],
      countriesOfOperation: [null],
      currencyOfTransactions: [null],
    });
  }

  onSubmit() {
    console.log(this.reportsForm);
  }

  get reportsType() {
    // let type: [] = this.reportsForm.get('selectedReportTypes')?.value();
    // return type.includes('Налоговая отчетность');
    return false
  }
}
