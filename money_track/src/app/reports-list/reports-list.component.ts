import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/services/backend';
import { AuditApplication } from '../../shared/interface/application.interface';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../shared/services/report.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-reports-list',
  imports: [
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    DatePipe,
    NgClass,
  ],
  templateUrl: './reports-list.component.html',
  styleUrl: './reports-list.component.scss',
  standalone: true,
})
export class ReportsListComponent implements OnInit {
  reportArray: Partial<AuditApplication>[] = [];

  constructor(
    private back: BackendService,
    private ReportSubject: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ReportSubject.getEdit().subscribe(curr => {
      if (!curr) {
        this.getAllReports();
      }
    });
  }

  getAllReports() {
    this.back.getApplications().subscribe(allRep => {
      this.reportArray = allRep;
    });
  }

  deleteReport(id: string) {
    this.back.deleteApplication(id).subscribe(() => {
      this.getAllReports();
    });
  }

  editReport(id: string) {
    this.back.getApplicationById(id).subscribe(rep => {
      this.ReportSubject.changeReport(rep);
    });
    this.router.navigate(['/reports']);
  }
}
