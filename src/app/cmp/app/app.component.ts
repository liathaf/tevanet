import { Component , PLATFORM_ID , Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { ChildToParentService } from '../../services/child-to-parent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  imgUrlSub!: Subscription;
  breadcrumbSub!: Subscription;
  totalPriceSub!: Subscription;
  productImg!: { imgName: string, imgUrl: string };
  breadcrumb!: { productName: string, productId: string, category: string }
  isDisplayScreen!: boolean;
  isDisplayModal!: boolean;
  isAtDetailsPage!: boolean;
  isAtProductsPage!: boolean;
  totalPriceToPay!: number;
  isLoadPage!: boolean;



  constructor(private ChildToParentService: ChildToParentService , @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {

    // app component updates when the user click to enlarge img. then the app component display the img on screen. 
    this.imgUrlSub = this.ChildToParentService.productImg$.subscribe(productImg => {
      this.productImg = productImg;
      this.toggleScreenDisplay();
    });

    // breadcrumb
    this.breadcrumbSub = this.ChildToParentService.breadcrumb$.subscribe(breadcrumb => this.breadcrumb = breadcrumb);

    // app cmp updates when user click to pay , payment cmp send the total price to dispay on modal
    this.totalPriceSub = this.ChildToParentService.totalPrice$.subscribe(totalPrice => {
      if (totalPrice > 0) this.totalPriceToPay = totalPrice
      if (isPlatformBrowser(this.platformId)) setTimeout(()=> {
        window.scroll(0,0);
      }, 0)  
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

    this.isLoadPage = true;
    setTimeout(() => { this.isLoadPage = false; }, 1000);
  }


  ngOnDestroy() {
    this.imgUrlSub.unsubscribe();
    this.breadcrumbSub.unsubscribe();
    this.totalPriceSub.unsubscribe();
  }
}


