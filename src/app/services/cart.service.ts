import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../interfaces/cart-item';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const MAIN_URL: string = "http://localhost:3000/cart-items"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Store the appropriate base URL. Angular automatically selects the right environment file.
  private readonly BASE_URL = environment.cartApiBaseUrl;

  constructor(private http: HttpClient) { }

  // Uses server at localhost:3000
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.BASE_URL);
  }

  getItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.BASE_URL}/${id}`);
  }

  deleteItemById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  addItemToCart(newItem: CartItem): Observable<CartItem> {
    // const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<CartItem>(`${this.BASE_URL}`, newItem);
  }

  editItemInCartById(updatedItem: CartItem): Observable<CartItem> {
    // const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.put<CartItem>(`${this.BASE_URL}/${updatedItem.id}`, updatedItem);
  }
}
