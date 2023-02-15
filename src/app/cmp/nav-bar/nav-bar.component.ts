import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../models/cartProduct';
import { ChildToParentService } from '../../services/child-to-parent.service';



@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: []
})

export class NavBarComponent implements OnInit {

  @Input() isLoadPage!: boolean;
  isOpenManu!: boolean;
  isOpenProductCategoryManu!: boolean;
  isScrolled!: boolean;
  isRemovePointerEvents!: boolean;
  isDisplayCart!: boolean;
  cartProducts: cartProduct[] = [];
  isDisablePointerEvents!: boolean;
  isCloseCart!: boolean;


  cartProdSub!: Subscription;
  isDisplayCartSub!: Subscription;

  // listen to the scroll for the nav-bar tranformation 
  // @HostListener('window:scroll') onScrollEvent() {

  //   const positionY = window.scrollY;
  //   if ((positionY) > 200) this.isScrolled = true;
  //   else this.isScrolled = false;

  // }
  constructor(private router: Router, private CartService: CartService, private ChildToParentService: ChildToParentService) { }

  ngOnInit(): void {


    this.CartService.loadCartProducts();
    this.cartProdSub = this.CartService.cartProducts$.subscribe((cartProducts) => {
      this.cartProducts = [...cartProducts];
    });

    // msg to display cart when adding/updating product to cart
    this.isDisplayCartSub = this.ChildToParentService.isDisplayCart$.subscribe(isDisplayCart => {
      this.isDisplayCart = isDisplayCart;
      setTimeout(() => {
        this.isDisplayCart = false;
      }, 3000)
    })

  }

  toggleManu() { // for non desktop layout

    this.isOpenManu = !this.isOpenManu;

  }

  ngOnChanges() {

    // if the user click on manu , on navigate to diffrent page , hide the nav-bar manu
    if (this.isLoadPage) this.isOpenManu = false;
  }


  toggleProductCategoryManu() {  //for non desktop layout
    this.isOpenProductCategoryManu = !this.isOpenProductCategoryManu;
  }

  goToProductsPage(path: string) {

    // when clicking on categorie
    this.isRemovePointerEvents = true; // hide drop-down categories by removing the hover effect
    setTimeout(() => {
      this.isRemovePointerEvents = false; // wait for 1sec and return the hover effect 
    }, 1000);

    this.toggleManu();
    this.isOpenProductCategoryManu = false;
    this.router.navigateByUrl(path);
  }

  goToNavBarLink(path: string) {
    this.toggleManu();
    this.router.navigateByUrl(path);
  }

  // nav-bar cmp get input from cart cmp to decrease/increase the quantity of product
  onChangeProductQuantity({ cartProductId, action }: { cartProductId: string, action: string }) {
    this.CartService.updateProductQuantity({ cartProductId, action });

  }

  // nav-bar cmp get input from cart cmp to remove product
  onRemoveCartProduct(cartProductId: string) {
    this.CartService.removeProductCart(cartProductId);

  }

  // when clicking on product in cart , disable the hover effect on cart
  onRemovePointerEventsFromCart(isRemovePointerEventsFromCart: boolean) {

    this.isDisablePointerEvents = isRemovePointerEventsFromCart;
  }

  closeCart() {
    // hide cart
    this.isCloseCart = true;
    this.onRemovePointerEventsFromCart(true);
    // wait for 1msec and return the hover effect by removing the class to hide the cart
    setTimeout(() => {
      this.onRemovePointerEventsFromCart(false);
      this.isCloseCart = false;
    }, 1000);
  }

  ngOnDestroyed() {
    this.cartProdSub.unsubscribe();
    this.isDisplayCartSub.unsubscribe();
  }

}
