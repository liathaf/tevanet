import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: []
})

export class ProductFilterComponent implements OnInit {

  filterBy: any;
  isInputOnFocus!: boolean;
  @ViewChild('inputFilter') inputFilter!: ElementRef;

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }


  // user searching product
  onSearch() {

      if (!this.filterBy) return;
  
      // navigate to products page
      this.router.navigate([`products/${this.filterBy}` , {search: true}]);
      
      // reset the search input element
      this.filterBy = '';
      this.inputFilter.nativeElement.blur();

  }

}
