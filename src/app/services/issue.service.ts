import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../constants/issue';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = `${environment.apiUrl}/issues`;

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  getIssue(id: number): Observable<Issue> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Issue>(url);
  }

  getIssuesByUser(userId: number): Observable<Issue[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Issue[]>(url);
  }

  createIssue(issue: Issue): Observable<Issue> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Issue>(this.apiUrl, issue, { headers });
  }

  updateIssue(issue: Issue): Observable<Issue> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Issue>(this.apiUrl + "/" + issue.id, issue, { headers });
  }
}
