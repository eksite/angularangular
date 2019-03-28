import { Component, OnInit, OnChanges } from "@angular/core";
import { SelectItem } from 'primeng/api';
import { AuthService } from "../service/auth.service";
import { CookieServiceService } from "../cookie/cookie-service.service";
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import {resultPoints,Point,Value} from '../form/app.pointComp'


const value: Value[] = [
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
]

const value1: Value[] = [
  { name: "-3", value: -3 },
  { name: "-2", value: -2 },
  { name: "-1", value: -1 },
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
]

@Component({
  selector: "formBar",
  templateUrl: "../form/form.html",
  styleUrls: ['../form/form.css']
})

export class formComp {
  yFromPage: number = 1;
  model: any = {};
  optionsR: Value[];
  options1: Value[];
  SelectedR: Value = {name:"1", value:1};
  SelectedOptionsX: Value[];
  pointt: Point;
  pointsFromServer: any;
  xCheck: boolean;
  rCheck: boolean = true;;

  constructor(private authenticationService: AuthService, private cookieService: CookieServiceService, private router: Router) {
    
    this.authenticationService.check();
    this.optionsR = value;
    this.options1 = value1;
    this.getPoints();
    
  }

  submitCanvas(e: any) {
    let points = [];
    let x=e.offsetX;
    let y=e.offsetY;
    console.log("x:" + x);
    console.log("y:" + y);
    let xcoor=(((x-110)/80)*this.SelectedR.value);
    let ycoor=(((-(y-107))/80)*this.SelectedR.value);
    xcoor.toFixed(4);
    ycoor.toFixed(4);
    let pointt=new Point(xcoor,ycoor,this.SelectedR.value)
    points.push(pointt);
    this.send(points);
  }
  
  drawPoints(pointsForDraw: any) {
  console.log(pointsForDraw.length);
  let canvas=<HTMLCanvasElement>document.getElementById("canvas");
  let context=canvas.getContext("2d");
  context.clearRect(0,0,500,300);
  for(let i=0;i<pointsForDraw.length;i++){
  	  let x = pointsForDraw[i].x;
  	  let y = pointsForDraw[i].y;
  	  let r = this.SelectedR.value;
  	  let inArea = pointsForDraw[i].inArea;

  	  /*
  	  changing color on change R value
  	  inArea = false;
  	  if (x >= 0 && y >= 0 && x*x + y*y <= r*r) inArea = true;
      if (x >= 0 && y <= 0 && y >= (x-r)/2) inArea = true;
      if (x <= 0 && y <= 0 && y > -r && x > -r) inArea = true;
      */

  	  if(inArea) {
  	  	context.fillStyle = "black";
      }else{
      	context.fillStyle = "red";
      }
      
      let canvas_x = (x*121)/r + 140;
      let canvas_y = (-y*55)/r + 73;

      context.fillRect(canvas_x, canvas_y, 4, 2);

    }
  }
  
  submit() {
    let points = [];
    this.checker();
    for (var j = 0; j < this.SelectedOptionsX.length; j++) {
      let pointt = new Point(this.SelectedOptionsX[j].value, this.yFromPage, this.SelectedR.value);
      points.push(pointt)
    }
    this.send(points);
  }


  send(points: Point[]) {
    
    this.authenticationService.submit(JSON.stringify(points)).subscribe(
      data => {
        this.SelectedOptionsX = [];
        // this.pointsFromServer = [];
        this.getPoints();
      },
      error => {
        console.log(error)
      }
    )
  }

  getPoints() {
    this.authenticationService.takeResult().map(response => { this.pointsFromServer = response as resultPoints })
      .subscribe(
      wait => {
        
       this.drawPoints(this.pointsFromServer)
      },
      error => {

      }
      )
  }

 

  checker() {
    try {
      document.getElementById("xLabel").style.color = "black";
      this.SelectedOptionsX.length;
      this.xCheck = true;
    } catch (TypeError) {
      this.xCheck = false;
      document.getElementById("xLabel").style.color = "red";
      //Дописать проверку на R
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(
      data => {
        this.cookieService.deleteCookie();
        this.router.navigate(["/login"]);
      },
      error => {
        this.router.navigate(["/login"]);
      }
    );
  }

}
