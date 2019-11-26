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

  @Output() submitted = new EventEmitter<void>();


  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (this.itemId) {
      console.log(this.itemId);
      this.cartService.getItemById(this.itemId).subscribe(data => {
        this.formItem = data;
        console.log(data);
      });
    } else {
      this.formItem = { product: "", price: 0, quantity: 0 };
    }
  }

  onSubmit(formData: NgForm) {

  }

}
