import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';


import {Product} from '../../models/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent implements OnInit {

  @Input() products:Product[] = [];
  @Output() addProductToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
