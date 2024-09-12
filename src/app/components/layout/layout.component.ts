import { Component} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  pageTitle = 'Dashboard';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  logout(): void {
    this.authService.logout();
  }

  updatePageTitle(): void {
    const currentRoute = this.router.url;
    switch (true) {
      case currentRoute.includes('/dashboard'):
        this.pageTitle = 'Dashboard';
        break;
      case currentRoute.includes('/users'):
        this.pageTitle = 'Usuarios';
        break;
      case currentRoute.includes('/issues'):
        this.pageTitle = 'Incidencias';
        break;
      case currentRoute.includes('/categories'):
        this.pageTitle = 'Categorías';
        break;
      case currentRoute.includes('/statuses'):
        this.pageTitle = 'Estados';
        break;
      default:
        this.pageTitle = 'Admin Panel';
    }
  }
}
