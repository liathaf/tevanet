import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//cmps
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { PaymentComponent } from './pages/payment/payment.component';


// resolver
import { ProductResolver } from './resolver/product.resolver';
import { ArticleResolver } from './resolver/article.resolver';

const routes: Routes = [
  { path: 'payment', pathMatch: 'full', component: PaymentComponent },
  { path: 'article/:id', pathMatch: 'full', resolve: { article: ArticleResolver }, component: ArticleDetailsComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'contact', pathMatch: 'full', component: ContactComponent },
  { path: 'products/cart', pathMatch: 'full', component: CartComponent },
  { path: 'products/:filter', pathMatch: 'full', component: ProductsComponent },
  { path: 'product/:id', pathMatch: 'full', resolve: { product: ProductResolver }, component: ProductDetailsComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
