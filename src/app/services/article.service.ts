import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})


export class ArticleService {

    constructor(private http: HttpClient) { }


    private API_URL = environment.API_URL;
    private BASE_URL = `${this.API_URL}/api/article`


    private _article$ = new BehaviorSubject<[]>([]);
    public article$ = this._article$.asObservable();



    
    loadArticle() {
        this.http.get<[]>(this.BASE_URL)
            .pipe(
                map(article => article)).subscribe(article => this._article$.next(article));

    }
    


    public getArticleById(articleId: string | null) {

        return this.http.get<[]>(this.BASE_URL + `/${articleId}`)
            .pipe(
                catchError(() => throwError('no article found'))
            )
    }


}




