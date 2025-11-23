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
  constructor(public langService: TranslateService) { }

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
    this.typeControl.valueChanges.subscribe(() => this.applyAllFilters());
    this.amountControl.valueChanges.subscribe(() => this.applyAllFilters());
    this.categoriesControl.valueChanges.subscribe(() => this.applyAllFilters());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transArray']?.currentValue) {
      this.applyAllFilters();
    }
  }

  applyAllFilters() {
    let filtered = [...this.transArray];

    if (this.typeControl.value && this.typeControl.value !== 'undefined') {
      filtered = filtered.filter(trans => trans.type === this.typeControl.value);
    }

    if (this.amountControl.value === 'ascending') {
      filtered = [...filtered].sort((a, b) => a.amount - b.amount);
    } else if (this.amountControl.value === 'descending') {
      filtered = [...filtered].sort((a, b) => b.amount - a.amount);
    }

    const categories = this.categoriesControl.value as string[] | null;
    if (this.categoriesControl.value && categories!.length > 0) {
      filtered = filtered.filter(trans => categories!.includes(trans.category));
    }

    this.filterTransaction = filtered;
    this.pageIndex = 0;
  }

  get paginatedTransactions() {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filterTransaction.slice(startIndex, startIndex + this.pageSize);
  }

  resetFilterButton() {
    this.typeControl.setValue(null);
    this.amountControl.setValue(null);
    this.categoriesControl.setValue(null);
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



  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
