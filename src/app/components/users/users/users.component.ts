import { Component, OnInit } from '@angular/core';
import { User } from '../../../constants/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] // Cambiado a `styleUrls` para la notación correcta
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => this.errorMessage = 'Error al cargar a los usuarios.'
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/users/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }
}
