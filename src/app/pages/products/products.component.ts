import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';



import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ChildToParentService } from '../../services/child-to-parent.service';
import { CartService } from '../../services/cart.service';
import { scrollYService } from '../../services/scrollY.service';




@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  productsFilter: any;
  isSearchProduct!: boolean;
  isAtProductsPage: boolean = true;
  productSub: Subscription = new Subscription;
  routerSub: Subscription = new Subscription;
  scrollYpos: any;



  @HostListener('window:scroll', ['$event']) onScrollEvent($event:string) {
    this.scrollYpos = window.pageYOffset;
  }



  public destroyed = new Subject<any>();


  constructor(private ProductService: ProductService, private route: ActivatedRoute, private router: Router,
    private ChildToParentService: ChildToParentService , private cartService : CartService,
    private scrollYService: scrollYService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    
    // get the scroll Y position from the previous visit of this page
    this.scrollYpos = this.scrollYService.getScrollYPos('scrollYPosProductsPage');
    if (isPlatformBrowser(this.platformId)) setTimeout(()=>{
      window.scroll(0,parseInt(this.scrollYpos));
    } , 0)
    

    this.loadProductByFilter();

    /// for the same route(same label), is refreshing the list
    this.routerSub = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)).subscribe(() => {
        this.loadProductByFilter();
      });

    

  }


  async loadProductByFilter() {

    this.products = [];
    this.productsFilter = this.route.snapshot.paramMap.get('filter');

    
    const search = this.route.snapshot.params.search;
    if (search) this.isSearchProduct = true; // input filter

    //  breadcrumb
    this.ChildToParentService.breadcrumbToDisplay({ productName: '', productId: '', category: (!this.isSearchProduct) ? this.productsFilter : '' });

    // loading products
    try {
      const filter = (!this.isSearchProduct) ? { category: this.productsFilter } : { searchWords: this.productsFilter }
      
      await this.ProductService.loadProducts(filter);
      
      this.productSub = this.ProductService.product$.subscribe((products) => {
        this.products = [...products]
      });
    } catch (err) {
      console.log('cannot load product - products cmp');

    }

    this.isSearchProduct = false;

  }

  onAddProductToCart(product: Product) {
    this.cartService.saveCartProduct(product);

    /// update nav bar cmp to display cart animation
    this.ChildToParentService.displayCart(true);

  }

  ngOnDestroy() {

    this.productSub.unsubscribe();
    this.routerSub.unsubscribe();

    /// save the scroll Y position for the user returing to this page
    this.scrollYService.saveScrollYPos({
      scrollYPosProductsPage : this.scrollYpos,
    });
  
  }

}
