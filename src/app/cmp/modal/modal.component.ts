import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: []
})
export class ModalComponent implements OnInit {

  @Input() productImg!:{ imgName:string, imgUrl:string };
  @Output() closeModal = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
    
  }

  onCloseModal(){
    this.closeModal.emit();
  }
  
}
