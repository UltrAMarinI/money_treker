import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NameSubjectService {
  constructor() {}

  public userName = new BehaviorSubject<string>('');

  userNameSetValue(value: string) {
    this.userName.next(value);
  }
}
