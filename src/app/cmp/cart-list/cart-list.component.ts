import { Component, OnInit, Input,  EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

import { cartProduct } from '../../models/cartProduct';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: []
})
export class CartListComponent implements OnInit {

  @Input() cartProducts: cartProduct[] = [];
  @Input() atCartPage!: boolean;
  @Input() atPaymentPage!: boolean;
  @Output() changeProductQuantity =  new EventEmitter();
  @Output() removeCartProduct =  new EventEmitter();
  @Output() removePointerEventsFromCart = new EventEmitter();
  @Output() onCloseCart = new EventEmitter();

  constructor(private router: Router ) { }

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

  get totalPayment(){
    let totalPayment = 0;
    this.cartProducts.forEach(cartProduct => {
      const paymentPerProduct = cartProduct.product.price;
      const productQuantity = cartProduct.quantity;
      totalPayment += paymentPerProduct * productQuantity;
    });

    return totalPayment;
  }

  get paymentSrc(){
    return `https://direct.tranzila.com/tevab12/iframenew.php?sum=${this.totalPayment}&currency=1&cred_type=1`
  }

}
