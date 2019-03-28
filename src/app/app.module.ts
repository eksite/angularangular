import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import {AuthService} from "../app/service/auth.service"
import { formComp } from "./form/app.formComp";
import { headerComp } from "./header/app.headerComp";
import { LoginComponent } from "./logForm/app.logFormComp";
import {CookieService} from "ngx-cookie-service";
import {CookieServiceService} from "../app/cookie/cookie-service.service";
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from "primeng/dropdown"

import {MultiSelectModule} from '../../node_modules/primeng/multiselect';
import { RegCompComponent } from './registration/reg-comp.component'; 
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent, formComp, headerComp, LoginComponent, RegCompComponent
  ],
  imports: [BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,    
    MultiSelectModule,
    BrowserModule,
    AppRoutingModule,
    SliderModule,
    TableModule,
    DropdownModule
  ],
  providers: [AuthService,CookieService,CookieServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
