import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private languageSubj = new BehaviorSubject<string>('ru');
  language$ = this.languageSubj.asObservable();

  setLanguage(lang: string) {
    this.languageSubj.next(lang);
  }

  getLanguage(): string {
    return this.languageSubj.value;
  }
}
