import { Component } from '@angular/core';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { AddTransactionComponentComponent } from './add-transaction-component/add-transaction-component.component';

@Component({
  selector: 'app-main-interface-component',
  imports: [HeaderComponentComponent, AddTransactionComponentComponent],
  templateUrl: './main-interface-component.component.html',
  styleUrl: './main-interface-component.component.scss',
  standalone: true,
})
export class MainInterfaceComponentComponent {}
