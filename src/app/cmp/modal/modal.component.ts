import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: []
})
export class ModalComponent implements OnInit {

  @Input() productImg!:{ imgName:string, imgUrl:string };
  @Input() totalPriceToPay!:number;
  @Output() closeModal = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
    
  }

  get paymentSrc() {
    return `https://direct.tranzila.com/tevab12/iframenew.php?sum=${this.totalPriceToPay}&currency=1&cred_type=1`
  }


  onCloseModal(){
    this.closeModal.emit();
  }
  
}
