import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  url = "https://api.escuelajs.co/api/v1";

  constructor() { }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
}
