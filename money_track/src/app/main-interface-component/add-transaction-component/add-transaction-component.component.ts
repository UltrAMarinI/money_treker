import { Component, ChangeDetectionStrategy, output, effect, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Transaction } from '../../../shared/interface/transaction.interface';
import { TranslateService } from '../../../shared/services/translate.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-transaction-component',
  providers: [provideNativeDateAdapter()],

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './add-transaction-component.component.html',
  styleUrl: './add-transaction-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AddTransactionComponentComponent {
  //форма добавления
  addFormTranz = output<Transaction>();
  editFormTrans = output<Transaction>();
  isEdit = output<boolean>();
  upForm = input.required<Transaction | undefined>();
  private isFirstChange = signal(true);

  constructor(public langService: TranslateService) {
    effect(() => {
      if (this.isFirstChange()) {
        this.isFirstChange.set(false);
        return;
      }
      this.isFormNotNull();
    });
  }

  TransForm: FormGroup = new FormGroup({
    type: new FormControl<string>('', Validators.required),
    amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    category: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
  });

  addTransaction() {
    const formValue = this.upForm();
    if (formValue === undefined) {
      this.addFormTranz.emit(this.TransForm.value);
    } else {
      const editerForm: Transaction = {
        ...this.TransForm.value,
        _id: formValue._id,
      };
      this.editFormTrans.emit(editerForm);
      this.isEdit.emit(true);
    }
    this.TransForm.reset();
  }

  isFormNotNull() {
    const formValue = this.upForm();
    if (formValue) {
      this.TransForm.get('type')?.setValue(formValue.type);
      this.TransForm.get('amount')?.setValue(formValue.amount);
      this.TransForm.get('category')?.setValue(formValue.category);
      this.TransForm.get('date')?.setValue(formValue.date);
      this.TransForm.get('description')?.setValue(formValue.description);
    }
  }
}
