import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './cmp/app/app.component';
import { NavBarComponent } from './cmp/nav-bar/nav-bar.component';
import { ProductFilterComponent } from './cmp/product-filter/product-filter.component';
import { ProductListComponent } from './cmp/product-list/product-list.component';
import { ProductPreviewComponent } from './cmp/product-preview/product-preview.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { ModalComponent } from './cmp/modal/modal.component';
import { BreadcrumbsComponent } from './cmp/breadcrumbs/breadcrumbs.component';
import { CartPreviewComponent } from './cmp/cart-preview/cart-preview.component';
import { CartListComponent } from './cmp/cart-list/cart-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { FooterComponent } from './cmp/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { SafePipe  } from './pipes/safePipe';
import { PaymentComponent } from './pages/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductFilterComponent,
    ProductListComponent,
    ProductPreviewComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProductsComponent,
    ModalComponent,
    BreadcrumbsComponent,
    CartPreviewComponent,
    CartListComponent,
    CartComponent,
    SafePipe ,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    ArticleDetailsComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
