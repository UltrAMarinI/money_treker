import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { token } from '../interface/token.interface';
import { Transaction } from '../interface/transaction.interface';
import { AuditApplication } from '../interface/application.interface';

type applicationPartical = Partial<AuditApplication>;

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private api = 'http://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  postAuth(person: User): Observable<token> {
    return this.http.post<token>(`${this.api}auth/signup`, person);
  }

  postLogin(newUser: User): Observable<token> {
    return this.http.post<token>(`${this.api}auth/login`, newUser);
  }

  postTransactoin(transaction: Transaction): Observable<void> {
    return this.http.post<void>(`${this.api}transactions`, transaction);
  }

  getTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.api}transactions`);
  }

  deleteTransaction(id: string): Observable<Transaction> {
    return this.http.delete<Transaction>(`${this.api}transactions/${id}`);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.api}transactions/${transaction._id}`, transaction);
  }

  // Получение всех заявок пользователя (включая черновики)
  getApplications(): Observable<applicationPartical[]> {
    return this.http.get<applicationPartical[]>(`${this.api}applications`);
  }

  // Получение конкретной заявки по ID
  getApplicationById(id: string): Observable<applicationPartical> {
    return this.http.get<applicationPartical>(`${this.api}applications/${id}`);
  }

  // Создание новой заявки (можно создать пустой черновик)
  createApplication(report: applicationPartical): Observable<AuditApplication> {
    return this.http.post<AuditApplication>(`${this.api}applications`, report);
  }

  // Обновление заявки (для черновиков - любые поля, для отправленных - ограничения)
  updateApplication(id: string, report: applicationPartical): Observable<applicationPartical> {
    return this.http.put<applicationPartical>(`${this.api}applications/${id}`, report);
  }

  // Удаление заявки (только черновики)
  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}applications/${id}`);
  }

  // Отправка черновика на проверку (меняет статус на submitted)
  submitApplication(id: string, report: applicationPartical): Observable<applicationPartical> {
    return this.http.patch<applicationPartical>(`${this.api}applications/${id}/submit`, report);
  }
}
