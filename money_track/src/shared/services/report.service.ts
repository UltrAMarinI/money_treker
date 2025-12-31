import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  upReport = new Subject();

  public changeReport(rep: object) {
    this.upReport.next(rep);
  }
}
