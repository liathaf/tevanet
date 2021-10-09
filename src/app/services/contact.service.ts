import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private API_URL = environment.API_URL;
  private BASE_URL = `${this.API_URL}/api/contact`

  constructor(private http: HttpClient) { }

  public async sendMail(contactForm:object){
   
    return this.http.post(this.BASE_URL , contactForm).toPromise();
      

      
  
  }
}
