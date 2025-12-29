import { Component, OnInit } from '@angular/core';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { AddTransactionComponentComponent } from './add-transaction-component/add-transaction-component.component';
import { ListTransactionComponentComponent } from './list-transaction-component/list-transaction-component.component';
import { BackendService } from '../../shared/services/backend';
import { Transaction } from '../../shared/interface/transaction.interface';
import { GraphicsTransactionComponentComponent } from './graphics-transaction-component/graphics-transaction-component.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-interface-component',
  imports: [
    HeaderComponentComponent,
    AddTransactionComponentComponent,
    ListTransactionComponentComponent,
    GraphicsTransactionComponentComponent,
    RouterModule,
  ],
  templateUrl: './main-interface-component.component.html',
  styleUrl: './main-interface-component.component.scss',
  standalone: true,
})
export class MainInterfaceComponentComponent implements OnInit {
  constructor(
    private back: BackendService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getTransArr();
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
}
