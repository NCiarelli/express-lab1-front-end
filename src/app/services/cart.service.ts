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
  getCart(): Observable<any> {

    return this.http.get(MAIN_URL);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${MAIN_URL}/${id}`);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${MAIN_URL}/${id}`);
  }
}
