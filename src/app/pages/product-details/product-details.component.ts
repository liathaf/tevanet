import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';



import { Product } from '../../models/product';
import { ChildToParentService } from '../../services/child-to-parent.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: []
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  isDetailsTodisplay!: boolean;
  isNotesTodisplay!: boolean;
  isInstructionTodisplay!: boolean;
  isTextNameTooLong!: boolean;
  isAtDetailsPage: boolean = true;
  scrollYpos!:number;


  constructor(private route: ActivatedRoute, private ChildToParentService: ChildToParentService, 
    private CartService: CartService, @Inject(PLATFORM_ID) private platformId: Object,private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId))  window.scroll(0,0);

    this.route.data.subscribe(data => {
      this.product = data.product

      // breadcrumb
      this.ChildToParentService.breadcrumbToDisplay({
        productName: this.product.name.HEB,
        productId: this.product._id,
        category: this.product.category
      })
    });
    this.isDetailsTodisplay = true; // on load page, the product ditails are displayed.

    // when the names of the product is too long , the class the layout need to
    // be in columns.
    const nameTextLengthHeb = this.product.name.HEB.length;
    const nameTextLengthEn = this.product.name.EN.length;
    if ((nameTextLengthHeb | nameTextLengthEn) > 14) {
      this.isTextNameTooLong = true;
    }


    //title 
    this.titleService.setTitle(`${this.product.name.HEB} | טבע בקריה`);
    /// meta tags
    this.metaService.addTags([
      {name: 'description', content: this.product.description.descPreview},
      {property: 'og:site_name', content: 'טבע בקריה | מוצרי טבע'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: `http://www.tevabakirya.co.il/product/${this.product._id}`},
      {property: 'og:title', content: `${this.product.name.HEB} | טבע בקריה`},
      {property: 'og:description', content: this.product.description.descPreview},
      {property: 'og:image', content: this.product.imgs.producImgUrl}
    ]);


  }

  toggleDescProductTabs(tabName: string) {

    // switch between the product ditails
    if (tabName === 'about') {
      this.isDetailsTodisplay = true;
      this.isNotesTodisplay = false;
      this.isInstructionTodisplay = false;
    }
    if (tabName === 'notes') {
      this.isNotesTodisplay = true;
      this.isDetailsTodisplay = false;
      this.isInstructionTodisplay = false
    }
    if (tabName === 'instructions') {
      this.isInstructionTodisplay = true;
      this.isDetailsTodisplay = false;
      this.isNotesTodisplay = false
    }
  }

  onDisplayImg({ imgName, imgUrl }: { imgName: string; imgUrl: string }) {
    // when user clickes to enlarge img, sent to app cmp the img Url to display
    this.ChildToParentService.productUrlToDisplay({ imgName, imgUrl });

    if (isPlatformBrowser(this.platformId)) setTimeout(()=> {
      window.scroll(0,0);
    }, 0);
  }

  onAddProductToCart() {
    this.CartService.saveCartProduct(this.product);

    /// update nav bar cmp to display cart animation
    this.ChildToParentService.displayCart(true);
  }

}
