import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';


// import { Cloudinary } from '@cloudinary/angular-5.x'; 

import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


// const CLOUDINARY_URL = 'cloudinary://289781188649973:ddulu0DxweH29CyUYUYkfzKAtwI@dlzwnajfq';

@Injectable({
    providedIn: 'root'
})


export class ProductService {

    constructor(
        // private cloudinary: Cloudinary,
        private http: HttpClient) { }


    private API_URL = environment.API_URL;
    private BASE_URL = `${this.API_URL}/api/product`


    private _product$ = new BehaviorSubject<Product[]>([]);
    public product$ = this._product$.asObservable();


    public async loadProducts(filterBy: any): Promise<any> {
        
        // filter by category - from products cmp
        if (filterBy.category) {
            filterBy = (filterBy.category === 'תוספים כללי-כל התוספים')?  '' : 'category=' + filterBy.category;
        }

        // filter by search input - form filter-product cmp
        else if (filterBy.searchWords) filterBy = 'searchwords=' + filterBy.searchWords; 
        else filterBy = '';
        
        
        
        this.http.get<Product[]>(`${this.BASE_URL}?${filterBy}`)
            .pipe(
                map(products => {this._product$.next(products)})).toPromise();

    }



    public getProductById(productId: string | null) {

        return this.http.get<Product[]>(this.BASE_URL + `/${productId}`)
            .pipe(
                catchError(() => throwError('no product found'))
            )
    }

    // public async removeRecipe(recipeId) {

    //     return await this.http.delete(`${this.BASE_URL}/${recipeId}`)
    //         .pipe(
    //             tap((newRecipes: []) => { this._recipes$.next(newRecipes) }),
    //             catchError(() => throwError('cannot remove recipe'))
    //         ).toPromise()

    // }

    // public async saveRecipe(newRecipe) {


    //     if (newRecipe._id) {

    //         return await this.http.put(`${this.BASE_URL}/${newRecipe._id}`, newRecipe)
    //             .pipe(
    //                 map(recipe => recipe),
    //                 catchError(() => throwError('cannot save recipe'))).toPromise();
    //     } else {
    //         newRecipe.createdAt = Date.now();
    //         newRecipe.comments = [];
    //         return await this.http.post(this.BASE_URL, newRecipe)
    //             .pipe(
    //                 map(recipe => recipe),
    //                 catchError(() => throwError('cannot save recipe'))).toPromise()
    //     }
    // }




    // public async uploadImg(ev) {


    //     const CLOUD_NAME = 'dlzwnajfq';
    //     const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    //     const formData = new FormData();
    //     formData.append('file', ev.target.files[0]);
    //     formData.append('upload_preset', 'aeyn7n9g');

    //     try {
    //         const res = await Axios.post(UPLOAD_URL, formData);
    //         return res.data.secure_url;
    //     } catch (err) {
    //         console.error(err)
    //     }

    // }

}




