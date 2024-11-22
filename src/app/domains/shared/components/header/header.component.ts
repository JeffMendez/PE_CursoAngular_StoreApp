import { Component, computed, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/producto.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) cart: Product[] = [];

  hideSideMenu = signal(true);
  total = signal(0);

  ngOnChanges(changes: SimpleChanges) {
    const cart = changes['cart'];
    if (cart) {
      this.total.set(this.calcularTotal());
    }
  }

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  calcularTotal() {
    return this.cart.reduce((total, product) => total + (product.price * product.quantity!), 0);
  }
}
