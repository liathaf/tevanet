import { Component, OnInit, Input,  EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

import { cartProduct } from '../../models/cartProduct';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: []
})
export class CartListComponent implements OnInit {

  @Input() cartProducts!: cartProduct[];
  @Input() atCartPage!: boolean;
  @Output() changeProductQuantity =  new EventEmitter();
  @Output() removeCartProduct =  new EventEmitter();
  @Output() removePointerEventsFromCart = new EventEmitter();
  @Output() onCloseCart = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goToCartPage(){
    // when clickin on link to cart page
    this.removePointerEventsFromCart.emit(true); // hide cart by removing the hover effect
    setTimeout(() => {
      this.removePointerEventsFromCart.emit(false); // wait for 1msec and return the hover effect 
    }, 1000);
    this.router.navigateByUrl('products/cart');
  }

}
