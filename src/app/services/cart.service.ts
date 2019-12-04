import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../interfaces/cart-item';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const MAIN_URL: string = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Store the appropriate base URL. Angular automatically selects the right environment file.
  private readonly BASE_URL = environment.cartApiBaseUrl;

  constructor(private http: HttpClient) { }

  // Uses server at localhost:3000
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.BASE_URL}/cart-items`);
  }

  getItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.BASE_URL}/cart-items/${id}`);
  }

  deleteItemById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/cart-items/${id}`);
  }

  addItemToCart(newItem: CartItem): Observable<CartItem> {
    // const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<CartItem>(`${this.BASE_URL}/cart-items`, newItem);
  }

  editItemInCartById(updatedItem: CartItem): Observable<CartItem> {
    // const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.put<CartItem>(`${this.BASE_URL}/cart-items/${updatedItem.id}`, updatedItem);
  }
}
