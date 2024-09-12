import { Component, OnInit } from '@angular/core';
import { Status } from '../../../constants/status';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../../../services/status.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './status-form.component.html',
  styleUrl: './status-form.component.css'
})
export class StatusFormComponent implements OnInit {
  status: Status = { id: 0, name: '' };
  errorMessage: string = '';
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadStatus(Number(id));
    }
  }

  loadStatus(id: number): void {
    this.statusService.getStatus(id).subscribe(
      data => this.status = data,
      error => this.errorMessage = 'Error al cargar el estado.'
    );
  }

  saveStatus(): void {
    if (this.status.name) {
      if (this.isEditMode) {
        this.statusService.updateStatus(this.status).subscribe(
          data => this.router.navigate(['/statuses']),
          error => this.errorMessage = 'Error al editar el estado.'
        );
      } else {
        this.statusService.createStatus(this.status).subscribe(
          data => this.router.navigate(['/statuses']),
          error => this.errorMessage = 'Error al crear el estado.'
        );
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/statuses']);
  }
}
