import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendService } from '../../../shared/services/backend';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './add-transaction-component.component.html',
  styleUrl: './add-transaction-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AddTransactionComponentComponent {
  //форма добавления

  constructor(private backend: BackendService) {}

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
    this.backend.postTransactoin(this.TransForm.value).subscribe((tr) => {
      console.log(tr);
    });
    this.TransForm.reset();
  }
}
