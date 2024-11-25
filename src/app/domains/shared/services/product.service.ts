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

  getProducts(category_id?: string) {
    const url = new URL(`${this.url}/products`);
    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
}
