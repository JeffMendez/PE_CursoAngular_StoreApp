import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + (product.price * product.quantity!), 0); 
  });

  constructor() {

  }

  addToCart(productSelected: Product) {
    this.cart.update(prevState => {
      const productIndex = prevState.findIndex((prod) => prod.id === productSelected.id);

      if (productIndex !== -1) {
        // Producto ya existe: Actualizamos su cantidad
        return prevState.map((prod, index) =>
          index === productIndex
            ? { ...prod, quantity: prod.quantity! + 1 }
            : prod
        );
      } else {
        // Producto no existe: Lo agregamos al carrito con cantidad inicial de 1
        return [...prevState, { ...productSelected, quantity: 1 }];
      }
    })
  }
}
