import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../interfaces/cart-item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() itemId: number;
  formItem: CartItem = {
    product: "",
    price: 0,
    quantity: 0
  };

  @Output() submitted = new EventEmitter<boolean>();

  cancelSubmit: boolean;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (this.itemId) {
      // console.log(this.itemId);
      this.cartService.getItemById(this.itemId).subscribe(data => {
        this.formItem = data;
        // console.log(data);
      });
    } else {
      this.formItem = { product: "", price: 0, quantity: 0 };
    }
  }

  onSubmit(submittedItem) {
    // Check if the form is for a new item or editting an item in the cart already
    // console.log(submittedItem);
    let sendItem: CartItem = submittedItem;
    if (this.itemId) {
      // If there is an id, send the editted item to the API to update the database
      // Including the current id
      submittedItem.id = this.itemId;
      this.cartService.editItemInCartById(submittedItem).subscribe(responseData => {
        // console.log("Edited Item: ", responseData);
        this.cancelSubmit = false;
        this.submitted.emit(this.cancelSubmit);
      });
    } else {
      // Otherwise send the new item to the API to insert into the database
      this.cartService.addItemToCart(submittedItem).subscribe(responseData => {
        // console.log("Added Item: ", responseData);
        this.cancelSubmit = false;
        this.submitted.emit(this.cancelSubmit);
      });
    }

  }

  cancel() {
    this.cancelSubmit = true;
    this.submitted.emit(this.cancelSubmit);
  }

}
