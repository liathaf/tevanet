import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../models/cartProduct';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {

  cartProducts:cartProduct[] = [];
  cartProdSub!:Subscription;
  atCartPage:boolean = true;


  constructor(private CartService: CartService , @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    
    if (isPlatformBrowser(this.platformId))  window.scroll(0,0);

    this.CartService.loadCartProducts();
    this.cartProdSub = this.CartService.cartProducts$.subscribe((cartProducts) => {
      this.cartProducts = [...cartProducts];
    });

  }

  onChangeProductQuantity({cartProductId , action}:{cartProductId:string , action:string}){
    this.CartService.updateProductQuantity({cartProductId , action});
  }

  onRemoveCartProduct(cartProductId:string){
    this.CartService.removeProductCart(cartProductId);
  }

  ngOnDestroy() {
    this.cartProdSub.unsubscribe();
  }

}
