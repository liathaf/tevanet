import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrls: []
})
export class ArticleDetailsComponent implements OnInit {

  article!: any;

  constructor(private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId))  window.scroll(0,0);
    this.route.data.subscribe(data => {this.article = data.article});
  }

}
