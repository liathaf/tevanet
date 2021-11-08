import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';


import { cartProduct } from '../../models/cartProduct';
import { CartService } from '../../services/cart.service';
import { ChildToParentService } from '../../services/child-to-parent.service';



@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: []
})
export class PaymentComponent implements OnInit {

  cartProducts: cartProduct[] = [];
  atPaymentPage: boolean = true;
  deliveryDetails = {
    name: '',
    phone: '',
    city: '',
    address: '',
    buildingNum: '',
    buildingEntrance: '',
    FloorNum: '',
    apartmentNum: '',
    mail: '',
    deliveryNotes: ''
  }
  isHomeDelivery!: boolean;
  isDisplayPaymantChoices!: boolean;
  paymantChoice!: string;
  isDisplayErrMsg!: boolean;
  @ViewChild('paymentChoice') paymentChoice!: ElementRef;
  cartProdSub!: Subscription;

  constructor(private CartService: CartService,
    private ChildToParentService: ChildToParentService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) window.scroll(0, 0);

    this.CartService.loadCartProducts();
    this.cartProdSub = this.CartService.cartProducts$.subscribe((cartProducts) => {
      this.cartProducts = [...cartProducts];
    });
  }

  get totalPayment() {
    let totalPayment = 0;
    this.cartProducts.forEach(cartProduct => {
      const paymentPerProduct = cartProduct.product.price;
      const productQuantity = cartProduct.quantity;
      totalPayment += paymentPerProduct * productQuantity;
    });

    return totalPayment;
  }

  get deliveryPaymant() {
    /// check if free delivery
    return (this.totalPayment >= 400) ? 0 : 30;

  }

  displayPaymantChoices(paymentChoice: string) {

    switch (paymentChoice) {
      case 'creditCart':
        this.paymentChoice.nativeElement.innerHTML = 'כרטיס אשראי מאובטח';
        this.paymantChoice = 'creditCart';
        this.isDisplayErrMsg = false;
        break;
      default:
        this.paymentChoice.nativeElement.innerHTML = 'בחרו אמצעי תשלום';
        this.paymantChoice = '';
    }

    this.isDisplayPaymantChoices = false;

  }

  onChangeProductQuantity({ cartProductId, action }: { cartProductId: string, action: string }) {
    this.CartService.updateProductQuantity({ cartProductId, action });
  }

  onRemoveCartProduct(cartProductId: string) {
    this.CartService.removeProductCart(cartProductId);
  }

  onSubmitPaymantForm() {

    if (!this.paymantChoice) {
      this.isDisplayErrMsg = true;
      return
    }

    this.ChildToParentService.getTotalPrice(this.totalPayment + this.deliveryPaymant);
    
  }

  ngOnDestroy() {
    this.cartProdSub.unsubscribe();
  }
}