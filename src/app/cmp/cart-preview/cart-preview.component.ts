import { Component, Input, OnInit ,EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

import { cartProduct } from '../../models/cartProduct';

@Component({
  selector: 'cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: []
})
export class CartPreviewComponent implements OnInit {

  @Input() cartProduct!: cartProduct;
  @Input() atCartPage!:boolean;
  @Output() onChangeProductQuantity = new EventEmitter();
  @Output() onRemoveCartProduct = new EventEmitter();
  @Output() onRemovePointerEventsFromCart = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit(): void {

    
  }

  goToProductDetails(){
    // when clicking on product in cart
    this.onRemovePointerEventsFromCart.emit(true); // hide cart by removing the hover effect
    setTimeout(() => {
      this.onRemovePointerEventsFromCart.emit(false); // wait for 1msec and return the hover effect 
    }, 1000);
    this.router.navigateByUrl(`product/${this.cartProduct.product._id}`);
  }

}
