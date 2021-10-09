import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { ArticleService } from '../services/article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<boolean> {
  constructor(private ArticleService: ArticleService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    
    return this.ArticleService.getArticleById(route.paramMap.get('id'))
      .pipe(catchError(err => {
        console.log('cannnot navigate to article-details page - article resolver');
        this.router.navigateByUrl('')
        return of(null)
      }))
  }
}
