import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // @Input - Enviar informacion padre -> hijo
  // @Input({ required: true }) price: number = 0;
  // @Input({ required: true }) title: string = '';
  @Input({ required: true }) product!: Product;

  // @Output - Enviar info hijo -> padre
  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('Click desde hijo');
    this.addToCart.emit(this.product);
  }
}
