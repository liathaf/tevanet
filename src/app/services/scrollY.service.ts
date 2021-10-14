import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})


export class scrollYService {



    constructor() { }


    public saveScrollYPos(scrollYPos:any) {

      
        if (scrollYPos.scrollYPosHomePage) {
            sessionStorage.setItem('scrollYPosHomePage' , scrollYPos.scrollYPosHomePage);
        }
        else sessionStorage.setItem('scrollYPosProductsPage' , scrollYPos.scrollYPosProductsPage);

        
        

    }

    public getScrollYPos(key:string) {
    
        return sessionStorage.getItem(key);
    }


}




