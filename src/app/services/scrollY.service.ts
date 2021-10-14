import { Injectable ,Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser} from '@angular/common';




@Injectable({
    providedIn: 'root'
})


export class scrollYService {



    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


    public saveScrollYPos(scrollYPos:any) {

      
        if (scrollYPos.scrollYPosHomePage) {
            if (isPlatformBrowser(this.platformId))  sessionStorage.setItem('scrollYPosHomePage' , scrollYPos.scrollYPosHomePage);
        }
        else if (isPlatformBrowser(this.platformId)) sessionStorage.setItem('scrollYPosProductsPage' , scrollYPos.scrollYPosProductsPage);

        
        

    }

    public getScrollYPos(key:string) {
        
        let scrollYPos;
        if (isPlatformBrowser(this.platformId)) {
            scrollYPos = sessionStorage.getItem(key);
        }
        return scrollYPos;
    }


}




