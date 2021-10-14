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




  constructor(private ChildToParentService: ChildToParentService) { }

  ngOnInit() {

    // app component updates when the user click to enlarge img. then the app component display the img on screen. 
    this.imgUrlSub = this.ChildToParentService.productImg$.subscribe(productImg => {
      this.productImg = productImg;
      this.toggleScreenDisplay();
    });

    // breadcrumb
    this.ChildToParentService.breadcrumb$.subscribe(breadcrumb => this.breadcrumb = breadcrumb);


  }

  toggleScreenDisplay() {
    this.isDisplayScreen = (this.productImg.imgUrl) ? true : false;
  }

  closeModal() {
    this.productImg.imgUrl = '';
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


