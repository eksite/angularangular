import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {formComp} from '../app/form/app.formComp';
import {LoginComponent} from '../app/logForm/app.logFormComp'
import { RegCompComponent } from './registration/reg-comp.component';
const routes: Routes = [
{ path: "form", component: formComp },
{ path: "login", component: LoginComponent },
{ path: "", redirectTo: "login", pathMatch: "full" },
{ path:"registr",component:RegCompComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
