import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CookieServiceService } from "../cookie/cookie-service.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-reg-comp',
  templateUrl: './reg-comp.component.html',
  styleUrls: ['./reg-comp.component.css']
})
export class RegCompComponent {
  checkData:boolean=true;
  model: any = {};
  constructor(private authenticationService: AuthService, private cookieService: CookieServiceService, private router: Router) { }

  registr() {
    this.authenticationService.registr(this.model.username, this.model.password).subscribe(
      data => {
        this.checkData=true;
        this.cookieService.setCookie(data['token']);
        this.router.navigate(["/form"]);
      },
      error => {
        this.checkData=false;
        // this.router.navigate(["/registr"]);
      })
  }

}

