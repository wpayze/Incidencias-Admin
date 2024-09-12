import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../services/issue.service';
import { Issue } from '../../../constants/issue';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-issues-show',
  standalone: true,
  imports: [],
  templateUrl: './issues-show.component.html',
  styleUrls: ['./issues-show.component.css']
})
export class IssuesShowComponent implements OnInit {
  issue: Issue | null = null;
  errorMessage: string = '';
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.loadIssue(Number(issueId));
    }
  }

  loadIssue(id: number): void {
    this.issueService.getIssue(id).subscribe(
      (data: Issue) => this.issue = data,
      (error) => this.errorMessage = 'Error al cargar la incidencia.'
    );
  }

  getImageUrl(imageUrl: string): string {
    return `${this.apiUrl}/images/${imageUrl}`;
  }
}
