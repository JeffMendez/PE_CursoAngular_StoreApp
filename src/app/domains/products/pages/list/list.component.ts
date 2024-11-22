import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/producto.model';
import { HeaderComponent } from "@shared/components/header/header.component";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  cart = this.cartService.cart;

  ngOnInit() {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.products.set(products);
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
