import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private cartService = inject(CartService);

  total = this.cartService.total;
  cart = this.cartService.cart;
  hideSideMenu = signal(true);

  // ngOnChanges(changes: SimpleChanges) {
  //   const cart = changes['cart'];
  //   if (cart) {
  //     this.total.set(this.calcularTotal());
  //   }
  // }

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  calcularTotal() {
    return this.cartService.total;
  }
}
