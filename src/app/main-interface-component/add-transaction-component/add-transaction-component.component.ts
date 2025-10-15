import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { c } from '../../../../node_modules/@angular/cdk/a11y-module.d--J1yhM7R';

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
export class AddTransactionComponentComponent implements OnChanges {
  //форма добавления
  @Output() addFormTranz = new EventEmitter<any>();
  @Output() editFormTrans = new EventEmitter<Transaction>();
  @Output() isEdit = new EventEmitter<boolean>();
  @Input() upForm!: Transaction | undefined;

  constructor(public langService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['upForm'].firstChange) {
      return;
    } else {
      this.isFormNotNull();
    }
  }

  TransForm: FormGroup = new FormGroup({
    type: new FormControl<string>('', Validators.required),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    category: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
  });

  addTransaction() {
    if (this.upForm === undefined) {
      this.addFormTranz.emit(this.TransForm.value);
    } else {
      const editerForm: Transaction = {
        ...this.TransForm.value,
        _id: this.upForm._id,
      };
      this.editFormTrans.emit(editerForm);
      this.isEdit.emit(true);
    }
    this.TransForm.reset();
  }

  isFormNotNull() {
    if (this.upForm !== undefined) {
      this.TransForm.get('type')?.setValue(this.upForm.type);
      this.TransForm.get('amount')?.setValue(this.upForm.amount);
      this.TransForm.get('category')?.setValue(this.upForm.category);
      this.TransForm.get('date')?.setValue(this.upForm.date);
      this.TransForm.get('description')?.setValue(this.upForm.description);
    }
  }
}
