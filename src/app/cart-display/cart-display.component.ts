import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../interfaces/cart-item';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartDisplayComponent implements OnInit {

  cart: CartItem[] = [];

  // Form Variables
  showForm: boolean = false;
  editId = null;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.refreshCart()
  }

  refreshCart(): void {
    this.cartService.getCart().subscribe(data => {
      this.cart = data;
      console.log(data);
    });
  }

  deleteItem(id: number): void {
    this.cartService.deleteItem(id).subscribe(() => this.refreshCart());
  }

  editItem(id: number) {
    this.editId = id;
    this.showForm = true;
  }

}
