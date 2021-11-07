import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildToParentService {

  constructor() { }

  /// when user clickes on img , update app component and send the url img
  private productImg = new BehaviorSubject({ imgName: '', imgUrl: '' });
  productImg$ = this.productImg.asObservable();

  productUrlToDisplay(productImg: { imgName: string, imgUrl: string }) {
    this.productImg.next(productImg)
  }

  /// detials and product-by-catedory page update the breadcumb to app cmp
  private breadcrumb = new BehaviorSubject({ productName: '', productId: '', category: '' });
  breadcrumb$ = this.breadcrumb.asObservable();

  breadcrumbToDisplay(breadcrumb: { productName: string, productId: string, category: string }) {
    this.breadcrumb.next(breadcrumb)
  }

  /// detials and product-by-catedory page update the breadcumb to app cmp
  private isDisplayCart = new BehaviorSubject(false);
  isDisplayCart$ = this.isDisplayCart.asObservable();

  displayCart(isDisplayCart:boolean) {
    this.isDisplayCart.next(isDisplayCart)
  }

  /// detials and product-by-catedory page update the breadcumb to app cmp
  private totalPrice = new BehaviorSubject(0);
  totalPrice$ = this.totalPrice.asObservable();

  getTotalPrice(totalPrice:number) {
    this.totalPrice.next(totalPrice)
  }

  
}
