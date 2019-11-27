import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../interfaces/cart-item';
import { Observable } from 'rxjs';

const MAIN_URL: string = "http://localhost:3000/cart-items"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Uses server at localhost:3000
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(MAIN_URL);
  }

  getItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${MAIN_URL}/${id}`);
  }

  deleteItemById(id: number): Observable<void> {
    return this.http.delete<void>(`${MAIN_URL}/${id}`);
  }

  addItemToCart(newItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${MAIN_URL}`, newItem);
  }

  editItemInCartById(updatedItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${MAIN_URL}/${updatedItem.id}`, updatedItem);
  }
}
