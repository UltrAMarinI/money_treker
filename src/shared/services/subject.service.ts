import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor() {}

  public userName = new BehaviorSubject<any>('');

  userNameSetValue(value: any) {
    this.userName.next(value);
  }
}
