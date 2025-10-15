import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Transaction } from '../../../shared/interface/transaction.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateService } from '../../../shared/services/translate.service';
import { AsyncPipe } from '@angular/common';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-list-transaction-component',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    DatePipe,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './list-transaction-component.component.html',
  styleUrl: './list-transaction-component.component.scss',
})
export class ListTransactionComponentComponent implements OnChanges, OnInit {
  //список с редактированием и удалением
  constructor(public langService: TranslateService) {}

  @Output() deleteTrans = new EventEmitter<string>();
  @Output() editTrans = new EventEmitter<Transaction>();
  @Input() transArray: Transaction[] = [];

  types: Type[] = [
    { value: 'undefined', viewValue: 'Все' },
    { value: 'income', viewValue: 'Доход' },
    { value: 'expense', viewValue: 'Расход' },
  ];

  amountes: Type[] = [
    { value: 'undefined', viewValue: 'Все' },
    { value: 'ascending', viewValue: 'По возрастанию' },
    { value: 'descending', viewValue: 'По убыванию' },
  ];

  typeControl = new FormControl(null);
  amountControl = new FormControl(null);
  categoriesControl = new FormControl(null);
  categoryList: string[] = ['food', 'transport', 'salary', 'present'];
  filterTransaction: Transaction[] = [];
  numberOfPages: number = 1;
  numberOfElement: number = 5;

  ngOnInit(): void {
    this.typeControl.valueChanges.subscribe((a) => {
      // this.amountControl.setValue(null, { emitEvent: false });
      // this.categoriesControl.setValue(null, { emitEvent: false });
      this.typeFilter(a);
    });
    this.amountControl.valueChanges.subscribe((a) => {
      // this.typeControl.setValue(null, { emitEvent: false });
      // this.categoriesControl.setValue(null, { emitEvent: false });
      this.amountFilter(a);
    });
    this.categoriesControl.valueChanges.subscribe((a) => {
      // this.typeControl.setValue(null, { emitEvent: false });
      // this.amountControl.setValue(null, { emitEvent: false });
      this.categoryFilter(a);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transArray'].currentValue) {
      this.filterTransaction = changes['transArray'].currentValue;
      console.log('length', this.filterTransaction.length);

      console.log('page', this.numberOfPages);
      console.log('elem', this.numberOfElement);
      this.typeFilter(this.typeControl.value);
      this.amountFilter(this.amountControl.value);
      this.categoryFilter(this.categoriesControl.value);
    }
  }

  deleteButton(id: string | undefined) {
    if (!id) return;
    else {
      this.deleteTrans.emit(id);
    }
  }

  editButton(trans: Transaction) {
    this.editTrans.emit(trans);
  }

  typeFilter(type: string | null) {
    if (type === null) return;
    if (type === 'undefined') {
      this.typeControl.setValue(null, { emitEvent: false });
      this.filterTransaction = [...this.transArray];
      this.amountFilter(this.amountControl.value);
      this.categoryFilter(this.categoriesControl.value);
    } else {
      this.filterTransaction = this.transArray.filter((trans) => {
        return type === trans.type;
      });
    }
  }

  amountFilter(amount: string | null) {
    if (amount === null) return;
    if (amount === 'ascending') {
      this.filterTransaction.sort((a, b) => a.amount - b.amount);
    } else if (amount === 'descending')
      this.filterTransaction.sort((a, b) => b.amount - a.amount);
    else {
      this.amountControl.setValue(null, { emitEvent: false });
      this.filterTransaction = [...this.transArray];
      this.typeFilter(this.typeControl.value);
      this.categoryFilter(this.categoriesControl.value);
    }
  }

  categoryFilter(category: string[] | null) {
    if (category === null) return;
    if (
      (this.typeControl.value !== null && category.length === 0) ||
      (this.amountControl.value !== null && category.length === 0)
    ) {
      this.filterTransaction = [...this.transArray];
      this.typeFilter(this.typeControl.value),
        this.amountFilter(this.amountControl.value);
    }
    if (category.length > 0) {
      this.filterTransaction = this.transArray.filter((cat) => {
        return category.includes(cat.category);
      });
    }
    // else {
    //   this.filterTransaction = [...this.transArray];
    // }
    if (
      category.length === 0 &&
      this.typeControl.value === null &&
      this.amountControl.value === null
    ) {
      this.filterTransaction = [...this.transArray];
    }
  }

  resetFilterButton() {
    this.typeControl.setValue(null, { emitEvent: false });
    this.amountControl.setValue(null, { emitEvent: false });
    this.categoriesControl.setValue(null, { emitEvent: false });
    this.filterTransaction = [...this.transArray];
  }

  checkPages(): number {
    if (Math.floor(this.filterTransaction.length / this.numberOfElement) <= 0) {
      return (this.numberOfPages = 1);
    } else
      return (this.numberOfPages = Math.floor(
        this.filterTransaction.length / this.numberOfElement
      ));
  }

  incrementPage() {
    let sumPage = this.checkPages();
    if (this.numberOfPages >= sumPage) return;
    this.numberOfPages++;
  }

  decrementPage() {
    if (this.numberOfPages === 1) return;
    this.numberOfPages--;
  }
}
