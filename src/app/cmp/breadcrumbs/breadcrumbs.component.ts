import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: []
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumb!: { productName: string, productId: string, category: string };
  @Input() isAtDetailsPage!: boolean;
  @Input() isAtProductsPage!: boolean;
  
  

  constructor() {

  }

  ngOnInit(): void {
  }

}
