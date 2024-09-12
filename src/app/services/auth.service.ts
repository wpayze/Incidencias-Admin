import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private isLoggedIn = false;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<{ user: { role: string }, token: string }>(url, body, { headers }).pipe(
      map(response => {
        if (response && response.token && response.user.role === 'ADMIN') {
          localStorage.setItem('token', response.token);
          this.isLoggedIn = true;
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError<boolean>('login', false))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
