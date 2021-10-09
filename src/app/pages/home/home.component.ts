import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ArticleService } from '../../services/article.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  articles!:any[];
  articleSub!: Subscription;

  constructor(private ArticleService: ArticleService) { }



  ngOnInit(): void {
    this.ArticleService.loadArticle();
      this.articleSub = this.ArticleService.article$.subscribe((articles) => {
        this.articles = [...articles]
      });
    
  }


}
