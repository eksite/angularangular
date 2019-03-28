import { Component } from "@angular/core";
import { AuthService } from "../service/auth.service"
import 'rxjs/add/operator/map';
import { CookieServiceService } from "../cookie/cookie-service.service";
import { Router } from "@angular/router"

@Component({
    templateUrl: "../logForm/logForm.html",
    styleUrls: ['../logForm/logForm.css']
}) 
export class LoginComponent {
    bool:boolean=true;;
    constructor(private authenticationService: AuthService, private cookieService: CookieServiceService, private router: Router) { }
     model: any = {};
   
   
    login() {
        this.authenticationService.login(this.model.username, this.model.password).subscribe(
            data => {
                this.bool=true;
                this.cookieService.setCookie(data['token']);
                this.router.navigate(["/form"]);
            },
            error => {
                this.bool=false;
                console.log(error);
            })
    }
}
