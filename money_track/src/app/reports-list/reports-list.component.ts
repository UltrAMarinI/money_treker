import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/services/backend';
import { AuditApplication } from '../../shared/interface/application.interface';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../shared/services/report.service';

@Component({
  selector: 'app-reports-list',
  imports: [RouterLink],
  templateUrl: './reports-list.component.html',
  styleUrl: './reports-list.component.scss',
  standalone: true,
})
export class ReportsListComponent implements OnInit {
  reportArray: Partial<AuditApplication>[] = [];

  constructor(
    private back: BackendService,
    private subject: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllReports();
  }

  getAllReports() {
    this.back.getApplications().subscribe(allrep => {
      this.reportArray = allrep;
    });
  }

  deleteReport(id: string) {
    this.back.deleteApplication(id).subscribe(() => {
      console.log('удалено');
      this.getAllReports();
    });
  }

  editReport(id: string) {
    this.back.getApplicationById(id).subscribe(rep => {
      this.subject.changeReport(rep);
    });
    this.router.navigate(['/reports']);
  }
}
