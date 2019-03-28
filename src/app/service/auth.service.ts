import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CookieServiceService } from "../cookie/cookie-service.service";
import { Router } from "@angular/router"


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieServiceService, private router: Router) { }

  login(username: string, password: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
         
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:8080/Lab4Service-1.0-SNAPSHOT/rest/login',
      JSON.stringify({ login: username, password: password }), options)
  }
  submit(any){
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +this.cookieService.getCookie()
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'    
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:8080/Lab4Service-1.0-SNAPSHOT/rest/points',any,options)
  }
  takeResult(){
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +this.cookieService.getCookie()
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'    
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:8080/Lab4Service-1.0-SNAPSHOT/rest/points',options)
  }
  check() {
    const httpHeader={
      headers:new HttpHeaders({
        'Authorization': 'Bearer ' +this.cookieService.getCookie()
      })
    }
   
    
    return this.http.get('http://localhost:8080/Lab4Service-1.0-SNAPSHOT/rest/auth',httpHeader).subscribe(
      data=>{
        console.log("проверку прошел")
        var bool=data['auth'];
        console.log(bool);
        if(bool=="true"){
          console.log("true")
          this.router.navigate(["/form"])
        }else{
          console.log("false")
          this.router.navigate(["/login"])
        }
      },
      error=>{
        this.router.navigate(["/login"])
      }
    );
  }

  logout() {
    const httpHeader={
      headers:new HttpHeaders({
        'Authorization': 'Bearer ' +this.cookieService.getCookie()
      })
    }
    return this.http.post('http://localhost:8080/Lab4Service-1.0-SNAPSHOT/rest/logout',null,httpHeader)
  }
  registr(username: string, password: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'    
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:8080/Lab4Service-1.0-SNAPSHOT/rest/signup',
      JSON.stringify({ login: username, password: password }), options)
  }
}
