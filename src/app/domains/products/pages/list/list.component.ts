import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/producto.model';
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);
  cart = signal<Product[]>([]);

  constructor() {
    this.products.set([
      {
        id: Date.now(),
        title: 'Producto Gen(1)',
        price: 100,
        image: 'https://picsum.photos/640/640?r=23', 
      },
      {
        id: Date.now() + 1,
        title: 'Producto Gen(2)',
        price: 340,
        image: 'https://picsum.photos/640/640?r=24',
      },
      {
        id: Date.now() + 3,
        title: 'Producto Gen(3)',
        price: 617,
        image: 'https://picsum.photos/640/640?r=25',
      }
    ]);
  }

  handleAddCart(productSelected: Product) {
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
