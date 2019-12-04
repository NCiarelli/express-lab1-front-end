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
  cartTotal: number = 0;

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
      // console.log(data);
      this.getCartTotal();
    });
  }

  deleteItemById(id: number): void {
    this.cartService.deleteItemById(id).subscribe(() => {
      this.refreshCart();
    });
  }

  editItem(id: number): void {
    // Indicate to the form that it is an item edit by passing the item id
    this.editId = id;
    // Display the form
    this.showForm = true;
  }

  addNewItem(): void {
    // Indicate to the form that it is a new item by sending a null id
    this.editId = null;
    // Display the form
    this.showForm = true;
  }

  onSubmitted(cancelled: boolean): void {
    if (!cancelled) {
      // If the form was submitted without cancelling
      // Just refresh the cart display to get the new info
      this.refreshCart();
    }
    // No matter what, remove the form
    this.showForm = false;
  }

  getCartTotal(): number {
    this.cartTotal = 0;
    this.cart.forEach((item) => {
      this.cartTotal += item.price * item.quantity;
    });
    return this.cartTotal;
  }

}
