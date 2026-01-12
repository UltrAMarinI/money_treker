import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  upReport = new Subject();
  private editSubject$ = new BehaviorSubject<boolean>(false);

  public changeReport(rep: object) {
    this.upReport.next(rep);
  }

  public getEdit(): Observable<boolean> {
    return this.editSubject$.asObservable();
  }

  public editChange(current: boolean) {
    this.editSubject$.next(current);
  }
}
