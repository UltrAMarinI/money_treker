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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-list-transaction-component',
  imports: [
    MatPaginatorModule,
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
  paginatorInfo = {};
  pageSize = 5;
  pageIndex = 0;

  ngOnInit(): void {
    // combineLatest([
    //   this.typeControl.valueChanges,
    //   this.amountControl.valueChanges,
    //   this.categoriesControl.valueChanges,
    // ]).subscribe(([type, amount, category]) => {
    //   this.applyAllFilters(type, amount, category);
    // });
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
    if (changes['transArray'].currentValue && changes['transArray']) {
      this.filterTransaction = changes['transArray'].currentValue;
      // this.applyAllFilters(
      //   this.typeControl.value,
      //   this.amountControl.value,
      //   this.categoriesControl.value
      // );
      this.paginatedTransactions;
      this.typeFilter(this.typeControl.value);
      this.amountFilter(this.amountControl.value);
      this.categoryFilter(this.categoriesControl.value);
    }
  }

  get paginatedTransactions() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filterTransaction.slice(startIndex, endIndex);
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

  // applyAllFilters(
  //   type: string | null,
  //   amount: string | null,
  //   categories: string[] | null
  // ) {
  //   let filtered = [...this.transArray];

  //   if (type && type !== 'undefined') {
  //     filtered = filtered.filter((trans) => {
  //       return type === trans.type;
  //     });
  //   }

  //   if (amount === 'ascending') {
  //     filtered = [...filtered].sort((a, b) => a.amount - b.amount);
  //   } else if (amount === 'descending')
  //     filtered = [...filtered].sort((a, b) => b.amount - a.amount);

  //   if (categories && categories.length > 0) {
  //     filtered = filtered.filter((trans) =>
  //       categories.includes(trans.category)
  //     );
  //   }

  //   this.filterTransaction = filtered;
  //   this.pageIndex = 0;
  // }

  typeFilter(type: string | null) {
    console.log('type work');

    if (type === null) return;
    if (type === 'undefined') {
      this.typeControl.setValue(null, { emitEvent: false });
      this.filterTransaction = [...this.transArray];
      this.amountFilter(this.amountControl.value);
      this.categoryFilter(this.categoriesControl.value);
    } else {
      this.paginatedTransactions;
      this.filterTransaction = this.transArray.filter((trans) => {
        return type === trans.type;
      });
    }
  }

  amountFilter(amount: string | null) {
    console.log('prise work');

    if (amount === null) return;
    if (amount === 'ascending') {
      this.paginatedTransactions;
      this.filterTransaction.sort((a, b) => a.amount - b.amount);
    } else if (amount === 'descending') {
      this.paginatedTransactions;
      this.filterTransaction.sort((a, b) => b.amount - a.amount);
    } else {
      this.amountControl.setValue(null, { emitEvent: false });
      this.filterTransaction = [...this.transArray];
      this.typeFilter(this.typeControl.value);
      this.categoryFilter(this.categoriesControl.value);
    }
  }

  categoryFilter(category: string[] | null) {
    console.log('category work');

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
      this.paginatedTransactions;
      this.filterTransaction = this.transArray.filter((cat) => {
        return category.includes(cat.category);
      });
    }
    if (
      category.length === 0 &&
      this.typeControl.value === null &&
      this.amountControl.value === null
    ) {
      this.filterTransaction = [...this.transArray];
    }
  }

  resetFilterButton() {
    this.typeControl.setValue(null);
    this.amountControl.setValue(null);
    this.categoriesControl.setValue(null);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
