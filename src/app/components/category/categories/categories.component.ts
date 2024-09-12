import { Component, OnInit } from '@angular/core';
import { Category } from '../../../constants/category';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  errorMessage: string = '';

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      error => this.errorMessage = 'Failed to load categories.'
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/categories/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }
}
