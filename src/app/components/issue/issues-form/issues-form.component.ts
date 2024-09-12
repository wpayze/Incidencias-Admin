import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../services/issue.service';
import { CategoryService } from '../../../services/category.service';
import { StatusService } from '../../../services/status.service';
import { Category } from '../../../constants/category';
import { Status } from '../../../constants/status';
import { Issue } from '../../../constants/issue';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../../constants/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-issues-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './issues-form.component.html',
  styleUrls: ['./issues-form.component.css']
})
export class IssuesFormComponent implements OnInit {
  issue: Issue = {
    id: 0,
    title: '',
    description: '',
    address: '',
    latitude: 0,
    longitude: 0,
    category: { id: 0, name: '' },
    status: { id: 0, name: '' },
    comments: [],
    user: { id: 0, name: '', email: '', role: Role.USER },
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  categories: Category[] = [];
  statuses: Status[] = [];
  errorMessage: string = '';

  constructor(
    private issueService: IssueService,
    private categoryService: CategoryService,
    private statusService: StatusService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.loadIssue(Number(issueId));
    }
    this.loadCategoriesAndStatuses();
  }

  loadIssue(id: number): void {
    this.issueService.getIssue(id).subscribe(
      (data: Issue) => this.issue = data,
      (error) => this.errorMessage = 'Error al cargar la incidencia.'
    );
  }

  loadCategoriesAndStatuses(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        console.log('Categorías recibidas:', data);
        this.categories = data;
      },
      (error) => this.errorMessage = 'Error al cargar las categorías.'
    );

    this.statusService.getStatuses().subscribe(
      (data: Status[]) => {
        console.log('Estados recibidos:', data);
        this.statuses = data;
      },
      (error) => this.errorMessage = 'Error al cargar los estados.'
    );
  }

  onSubmit(): void {
    if (this.issue.id) {
      this.issueService.updateIssue(this.issue).subscribe(
        () => this.router.navigate(['/issues']),
        (error) => this.errorMessage = 'Error al actualizar la incidencia.'
      );
    } else {
      this.issueService.createIssue(this.issue).subscribe(
        () => this.router.navigate(['/issues']),
        (error) => this.errorMessage = 'Error al crear la incidencia.'
      );
    }
  }
}
