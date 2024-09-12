import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, Role } from '../../../constants/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  user: User = { id: 0, name: '', email: '', password: '', role: Role.USER };
  errorMessage: string = '';
  isEditMode: boolean = false;
  Role = Role;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadUser(Number(id));
    }
  }

  loadUser(id: number): void {
    this.userService.getUsers().subscribe(
      users => {
        const foundUser = users.find(user => user.id === id);
        if (foundUser) {
          this.user = foundUser;
        } else {
          this.errorMessage = 'Usuario no encontrado.';
        }
      },
      error => this.errorMessage = 'Error al cargar los usuarios.'
    );
  }

  saveUser(): void {
    if (this.user.name && this.user.email) {
      if (this.isEditMode) {
        this.userService.updateUser(this.user.id, this.user).subscribe(
          () => this.router.navigate(['/users']),
          error => this.errorMessage = 'Error al editar el usuario.'
        );
      } else {
        this.user.password = "";

        this.userService.createUser(this.user).subscribe(
          () => this.router.navigate(['/users']),
          error => this.errorMessage = 'Error al crear el usuario.'
        );
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
