import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { token } from '../interface/token.interface';
import { Transaction } from '../interface/transaction.interface';
import { AuditApplication } from '../interface/application.interface';

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
  getApplications(): Observable<AuditApplication[]> {
    return this.http.get<AuditApplication[]>(`${this.api}reports`);
  }

  // Получение конкретной заявки по ID
  getApplicationById(id: number): Observable<AuditApplication> {
    return this.http.get<AuditApplication>(`${this.api}reports/${id}`);
  }

  // Создание новой заявки (можно создать пустой черновик)
  createApplication(report: AuditApplication): Observable<void> {
    return this.http.post<void>(`${this.api}reports`, report);
  }

  // Обновление заявки (для черновиков - любые поля, для отправленных - ограничения)
  updateApplication(report: AuditApplication): Observable<AuditApplication> {
    return this.http.put<AuditApplication>(`${this.api}report/${report.id}`, report);
  }

  // Удаление заявки (только черновики)
  deleteApplication(id: number): Observable<AuditApplication> {
    return this.http.delete<AuditApplication>(`${this.api}reports/${id}`);
  }

  // Отправка черновика на проверку (меняет статус на submitted)
  submitApplication(report: AuditApplication): Observable<AuditApplication> {
    return this.http.patch<AuditApplication>(`${this.api}reports`, report);
  }
}
