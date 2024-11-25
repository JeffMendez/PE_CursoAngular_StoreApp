import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from "@shared/components/header/header.component";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  cart = this.cartService.cart;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const category_id = changes['category_id'];
    if (category_id) {
      this.getProducts()
    }
  }
  
  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private getCategories() {
    this.categoryService.getCategories()
    .subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  handleAddCart(productSelected: Product) {
    this.cartService.addToCart(productSelected);
  }
}
