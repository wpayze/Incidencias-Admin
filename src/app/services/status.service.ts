import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../constants/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = `${environment.apiUrl}/statuses`;

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }

  getStatus(id: number): Observable<Status> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Status>(url);
  }

  updateStatus(status: Status): Observable<Status> {
    const url = `${this.apiUrl}/${status.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Status>(url, status, { headers });
  }

  createStatus(status: Status): Observable<Status> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Status>(this.apiUrl, status, { headers });
  }
}
