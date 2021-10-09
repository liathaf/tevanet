import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';

import { StorageService } from './storage.service';
import { UtilService } from './utils.service';
import { cartProduct } from '../models/cartProduct';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private StorageService: StorageService, private UtilService: UtilService , @Inject(PLATFORM_ID) private platformId: Object) { }

  private key = "cartProducts";
     
  public cartProducts:cartProduct[] = this.loadProductFromStorage();

  private _cartProducts$ = new BehaviorSubject<cartProduct[]>([]);
  public cartProducts$ = this._cartProducts$.asObservable();

  public loadCartProducts():any {

    of(this.cartProducts).pipe(
        map(cartProducts => cartProducts)).subscribe(cartProducts => 
          this._cartProducts$.next(cartProducts));
  
  }

  private loadProductFromStorage(){
    
    let cartProducts;

    if (isPlatformBrowser(this.platformId)){
      cartProducts = this.StorageService.loadFromStorage(this.key);
    }
    
    if (cartProducts) return cartProducts;
    else return []; 
  }

  public saveCartProduct(cartProduct: Product) {

    // when user want to change the quantity of the product 
    // need to change the cartPriducts list.

    const isProductInCartProducts = this.cartProducts.find(product => cartProduct._id === product.product._id);
   
    if (isProductInCartProducts) {
      // unpdat existing product
      this.cartProducts = this.cartProducts.map(productInCart => {
        if (cartProduct._id === productInCart.product._id) {
          productInCart.quantity += 1;
          return productInCart;
        }
        else return productInCart;
        
      });
    }
    // add new product to cart
    else {
      const newCartProduct: cartProduct = {
        _id: this.UtilService.makeId(),
        product: cartProduct,
        quantity: 1

      }
      this.cartProducts.unshift(newCartProduct);
    }

    if (isPlatformBrowser(this.platformId)){
      this.StorageService.saveToStorage(this.key, this.cartProducts);
    }
    this.loadCartProducts();
    
  }

  public removeProductCart(cartProductId: string) {
    
    this.cartProducts = this.cartProducts.filter(cartProduct => {
      return cartProductId !== cartProduct._id;
    });

    if (isPlatformBrowser(this.platformId)){
      this.StorageService.saveToStorage(this.key, this.cartProducts);
    }
    this.loadCartProducts();
  }
  
  
  
  public updateProductQuantity({cartProductId , action}:{cartProductId:string , action:string}){
    this.cartProducts = this.cartProducts.map(productInCart => {
      if (cartProductId === productInCart._id) {
        productInCart.quantity += (action==='increase')? 1: (-1);
        if(productInCart.quantity<=0) productInCart.quantity = 1;
        return productInCart;
      }
      else return productInCart;
      
    });

    if (isPlatformBrowser(this.platformId)){
      this.StorageService.saveToStorage(this.key, this.cartProducts);
    }

    this.loadCartProducts();
  }
  
  
}
