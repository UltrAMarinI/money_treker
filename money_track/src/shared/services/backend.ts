import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { token } from '../interface/token.interface';
import { Transaction } from '../interface/transaction.interface';

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

  postTransactoin(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.api}transactions`, transaction);
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
}
