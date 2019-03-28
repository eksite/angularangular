import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
@Injectable()
export class CookieServiceService {
  constructor(private cookieService:CookieService) {

   }
   getCookie():string{
     return this.cookieService.get("token");
   }
   setCookie(value: string): void {
     this.cookieService.set("token",value);
   }
   deleteCookie(){
     this.cookieService.delete("token");
   }
}
