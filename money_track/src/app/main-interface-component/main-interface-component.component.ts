import { Component, OnInit } from '@angular/core';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { AddTransactionComponentComponent } from './add-transaction-component/add-transaction-component.component';
import { ListTransactionComponentComponent } from './list-transaction-component/list-transaction-component.component';
import { BackendService } from '../../shared/services/backend';
import { Transaction } from '../../shared/interface/transaction.interface';
import { GraphicsTransactionComponentComponent } from './graphics-transaction-component/graphics-transaction-component.component';
import { Router, RouterModule } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { addItems, loadItems } from '../store/feature/feature.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-interface-component',
  imports: [
    HeaderComponentComponent,
    AddTransactionComponentComponent,
    ListTransactionComponentComponent,
    GraphicsTransactionComponentComponent,
    RouterModule,
    MatAnchor,
  ],
  templateUrl: './main-interface-component.component.html',
  styleUrl: './main-interface-component.component.scss',
  standalone: true,
})
export class MainInterfaceComponentComponent implements OnInit {
  message = '';

  constructor(
    private back: BackendService,
    public router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getTransArr();

    this.store.subscribe(state => {
      console.log('State:', state);
      this.message = JSON.stringify(state);
    });
  }

  arrayTrans: Transaction[] = [];
  edit!: Transaction | undefined;

  addTranzact(form: Transaction): void {
    this.back.postTransactoin(form).subscribe(() => {
      this.getTransArr();
    });
  }

  getTransArr() {
    this.back.getTransaction().subscribe(arr => {
      this.arrayTrans = arr;
    });
  }

  deleteTranz(id: string | undefined): void {
    if (!id) return;
    else {
      this.back.deleteTransaction(id).subscribe(() => {
        this.getTransArr();
      });
    }
  }

  editTransact(trans: Transaction) {
    this.edit = trans;
  }

  putTransact(newTrans: Transaction) {
    this.back.updateTransaction(newTrans).subscribe(() => {
      this.getTransArr();
    });
  }

  resetFormCard(isEdit: boolean) {
    if (isEdit === true) this.edit = undefined;
  }

  reportsButton() {
    this.router.navigate(['/reports']);
  }

  stateButton() {
    this.store.dispatch(addItems({ item: 1 }));
  }
}
