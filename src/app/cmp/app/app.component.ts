import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChildToParentService } from '../../services/child-to-parent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  imgUrlSub!: Subscription;
  productImg!: { imgName: string, imgUrl: string };
  breadcrumb!: { productName: string, productId: string, category: string }
  isDisplayScreen!: boolean;
  isDisplayModal!: boolean;
  isAtDetailsPage!: boolean;
  isAtProductsPage!: boolean;
  totalPriceToPay!: number;




  constructor(private ChildToParentService: ChildToParentService) { }

  ngOnInit() {

    // app component updates when the user click to enlarge img. then the app component display the img on screen. 
    this.imgUrlSub = this.ChildToParentService.productImg$.subscribe(productImg => {
      this.productImg = productImg;
      this.toggleScreenDisplay();
    });

    // breadcrumb
    this.ChildToParentService.breadcrumb$.subscribe(breadcrumb => this.breadcrumb = breadcrumb);

    // app cmp updates when user click to pay , payment cmp send the total price to dispay on modal
    this.ChildToParentService.totalPrice$.subscribe(totalPrice => {
      if (totalPrice > 0) this.totalPriceToPay = totalPrice
      this.toggleScreenDisplay();
    });


  }

  toggleScreenDisplay() {

    if (this.productImg.imgUrl || this.totalPriceToPay > 0) this.isDisplayScreen = true
    else this.isDisplayScreen = false;
  }

  closeModal() {
    this.productImg.imgUrl = '';
    this.totalPriceToPay = 0;
    this.toggleScreenDisplay();
  }

  onActivate(ev: any) {
    this.isAtDetailsPage = ev.isAtDetailsPage;
    this.isAtProductsPage = ev.isAtProductsPage;
  }


  ngOnDestroy() {
    this.imgUrlSub.unsubscribe();
  }
}


