import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrls: []
})
export class ArticleDetailsComponent implements OnInit {

  article!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {this.article = data.article});
  }

}
