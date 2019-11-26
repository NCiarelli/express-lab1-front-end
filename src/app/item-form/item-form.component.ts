import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../interfaces/cart-item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() itemId: number;
  formItem: CartItem;


  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (this.itemId !== null) {
      console.log(this.itemId);
      this.cartService.getItemById(this.itemId).subscribe(data => {
        this.formItem = data;
        console.log(data);
      });
    } else {
      this.formItem = { product: "", price: 0, quantity: 0 };
    }
  }

}
