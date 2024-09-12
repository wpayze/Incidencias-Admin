import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IssueService } from '../../../services/issue.service';
import { Issue } from '../../../constants/issue';

@Component({
  selector: 'app-issues',
  standalone: true,
  imports: [],
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  errorMessage: string = '';

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe(
      (data: Issue[]) => this.issues = data,
      (error: HttpErrorResponse) => this.errorMessage = 'Error al cargar incidencias.'
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/issues/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/issues/edit', id]);
  }

  navigateToIssueDetail(id: number): void {
    this.router.navigate(['/issues/' + id]);
  }
}
