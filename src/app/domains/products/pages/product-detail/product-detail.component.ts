import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id?: number;
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  product = signal<Product | null>(null);
  imageSelected = signal<string>("");

  ngOnInit() {
    if (this.id) {
      this.productService.getProductById(this.id)
        .subscribe({ 
          next: (product) => {
            this.product.set(product);
            this.imageSelected.set(product.images[0]);
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  handleChangeSelectedImage(newImage: string) {
    this.imageSelected.set(newImage);
  }

  handleAddCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
