import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../services/contact.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: []
})
export class ContactComponent implements OnInit {

  lat = 31.543780570493123;
  lng = 35.118525544680224;

  name: string = '';
  mail: string = '';
  phone: string = '';
  desc: string = '';
  isMailSent!:boolean;
  isLoadingAnimationOn!:boolean;

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
  }

  async onSubmitContactForm() {
    this.isLoadingAnimationOn = true;
    try{
      const mail = await this.ContactService.sendMail({ name:this.name, mail:this.mail, phone:this.phone, desc: this.desc });
      this.isMailSent = true;
      this.isLoadingAnimationOn = false;
    }catch(Err){
      console.log('cannot send mail - contact cmp');
      
    }

  }

}


