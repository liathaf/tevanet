import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


import { Product } from '../../models/product';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: []
})
export class ProductPreviewComponent implements OnInit {

  @Input() product!:Product;
  @Output() onAddProductToCart = new EventEmitter();
  isTextNameTooLong!:boolean;

  constructor() { }

  ngOnInit(): void {
    
    // when the names of the product is too long , the class the layout need to
    // be in columns.

    const nameTextLengthHeb = this.product.name.HEB.length;
    const nameTextLengthEn = this.product.name.EN.length;
    if ((nameTextLengthHeb | nameTextLengthEn) > 14) {
      this.isTextNameTooLong = true;
    }
    

  }



}
