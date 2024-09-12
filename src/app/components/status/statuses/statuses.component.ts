import { Component, OnInit } from '@angular/core';
import { Status } from '../../../constants/status';
import { StatusService } from '../../../services/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statuses',
  standalone: true,
  imports: [],
  templateUrl: './statuses.component.html',
  styleUrl: './statuses.component.css'
})
export class StatusesComponent implements OnInit {
  statuses: Status[] = [];
  errorMessage: string = '';

  constructor(private statusService: StatusService, private router: Router) { }

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.statusService.getStatuses().subscribe(
      data => this.statuses = data,
      error => this.errorMessage = 'Failed to load statuses.'
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/statuses/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/statuses/edit', id]);
  }
}
