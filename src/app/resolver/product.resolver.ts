import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<boolean> {
  constructor(private ProductService: ProductService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    
    return this.ProductService.getProductById(route.paramMap.get('id'))
      .pipe(catchError(err => {
        console.log('cannnot navigate to product-details page - product resolver');
        this.router.navigateByUrl('')
        return of(null)
      }))
  }
}
