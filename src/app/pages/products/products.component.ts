import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ChildToParentService } from '../../services/child-to-parent.service';
import { CartService } from '../../services/cart.service';



@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  productsFilter: any;
  isSearchProduct!: boolean;
  isAtProductsPage: boolean = true;
  productSub: Subscription = new Subscription;
  routerSub: Subscription = new Subscription;

  public destroyed = new Subject<any>();


  constructor(private ProductService: ProductService, private route: ActivatedRoute, private router: Router,
    private ChildToParentService: ChildToParentService , private cartService : CartService) { }

  ngOnInit(): void {

    this.loadProductByFilter();

    /// for the same route(same label), is refreshing the page
    this.routerSub = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)).subscribe(() => {
        this.loadProductByFilter();
      });

  }

  async loadProductByFilter() {

    this.productsFilter = this.route.snapshot.paramMap.get('filter');
    const search = this.route.snapshot.params.search;
    if (search) this.isSearchProduct = true;

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

  }

  onAddProductToCart(product: Product) {
    this.cartService.saveCartProduct(product);

    /// update nav bar cmp to display cart animation
    this.ChildToParentService.displayCart(true);

  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

}
