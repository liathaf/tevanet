import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';


import { ArticleService } from '../../services/article.service';
import { scrollYService } from '../../services/scrollY.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  articles!: any[];
  articleSub!: Subscription;
  scrollYpos: any;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event:string) {
    this.scrollYpos = window.pageYOffset;
  }



  constructor(private ArticleService: ArticleService, private scrollYService: scrollYService, 
    @Inject(PLATFORM_ID) private platformId: Object , private titleService: Title, private metaService: Meta) { }



  ngOnInit(): void {

    
    // get the scroll Y position from the previous visit of this page
    this.scrollYpos = this.scrollYService.getScrollYPos('scrollYPosHomePage');
    if (isPlatformBrowser(this.platformId)) setTimeout(()=> {
      window.scroll(0,this.scrollYpos);
    }, 0)

    this.ArticleService.loadArticle();
    this.articleSub = this.ArticleService.article$.subscribe((articles) => {
      this.articles = [...articles]
    });

    //title 
    this.titleService.setTitle('טבע בקריה | מוצרי טבע');
    /// meta tags
    this.metaService.addTags([
      {name: 'description', content: ''},
      {property: 'og:site_name', content: 'טבע בקריה | מוצרי טבע'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: 'http://www.tevabakirya.co.il'},
      {property: 'og:title', content: 'טבע בקריה | מוצרי טבע'},
      {property: 'og:description', content: ''},
      {property: 'og:image', content: 'https://res.cloudinary.com/dlzwnajfq/image/upload/v1634376174/product/logo/teva-bakiria_logo_o9knbq.png'},
    ]);

  }

  ngOnDestroy() {

    /// save the scroll Y position for the user returing to this page
    this.scrollYService.saveScrollYPos({
      scrollYPosHomePage : this.scrollYpos,
      
    });

    this.articleSub.unsubscribe();
  }


}
