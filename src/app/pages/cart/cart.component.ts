import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../models/cartProduct';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {

  cartProducts!:cartProduct[];
  cartProdSub!:Subscription;
  atCartPage:boolean = true;


  constructor(private CartService: CartService) { }

  ngOnInit(): void {
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

}
