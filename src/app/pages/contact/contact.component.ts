import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import { ContactService } from '../../services/contact.service';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: []
})
export class ContactComponent implements OnInit {

  
  name: string = '';
  mail: string = '';
  phone: string = '';
  desc: string = '';
  isMailSent!: boolean;
  isLoadingAnimationOn!: boolean;
  
  center: google.maps.LatLngLiteral = {
    lat: 31.543780570493123,
    lng: 35.118525544680224
  };

  constructor(private ContactService: ContactService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) window.scroll(0, 0);
  }


  async onSubmitContactForm() {
    this.isLoadingAnimationOn = true;
    try {
      const mail = await this.ContactService.sendMail({ name: this.name, mail: this.mail, phone: this.phone, desc: this.desc });
      this.isMailSent = true;
      this.isLoadingAnimationOn = false;
    } catch (Err) {
      console.log('cannot send mail - contact cmp');

    }

  }

}



