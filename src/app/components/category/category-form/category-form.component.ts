import { Component, OnInit } from '@angular/core';
import { Category } from '../../../constants/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  category: Category = { id: 0 ,name: '' };
  errorMessage: string = '';
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadCategory(Number(id));
    }
  }

  loadCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe(
      data => this.category = data,
      error => this.errorMessage = 'Failed to load category.'
    );
  }

  saveCategory(): void {
    if (this.category.name) {
      if (this.isEditMode) {
        this.categoryService.updateCategory(this.category).subscribe(
          data => this.router.navigate(['/categories']),
          error => this.errorMessage = 'Failed to update category.'
        );
      } else {
        this.categoryService.createCategory(this.category).subscribe(
          data => this.router.navigate(['/categories']),
          error => this.errorMessage = 'Failed to create category.'
        );
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
