import { Component, Input, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Transaction } from '../../../shared/interface/transaction.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-graphics-transaction-component',
  imports: [],
  templateUrl: './graphics-transaction-component.component.html',
  styleUrl: './graphics-transaction-component.component.scss',
  providers: [DatePipe],
  standalone: true,
})
export class GraphicsTransactionComponentComponent implements OnDestroy {
  //вывести графики и статистику

  @Input() set transArrayGraph(arr: Transaction[]) {
    if (!arr.length) return;
    this.chartGenerate(arr);
  }

  chart!: Chart;
  constructor(private datePipe: DatePipe) {}

  ngOnDestroy() {
    this.chart?.destroy();
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd.MM.') || '';
  }

  formatIncome(a: Transaction): number | undefined {
    if (a.type === 'income') {
      return a.amount;
    } else return;
  }

  formatExpence(a: Transaction): number | undefined {
    if (a.type === 'expense') {
      return a.amount;
    } else return;
  }

  chartGenerate(arr: Transaction[]) {
    this.chart?.destroy();
    this.chart = new Chart<any>('canvas', {
      type: 'bar',
      data: {
        labels: arr.map((a) => this.formatDate(a.date)),
        datasets: [
          {
            label: 'Доходы',
            data: arr.map((arr) => this.formatIncome(arr)),
            borderWidth: 1,
          },
          {
            label: 'Расходы',
            data: arr.map((arr) => this.formatExpence(arr)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
