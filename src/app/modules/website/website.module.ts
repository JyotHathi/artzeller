import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [SignupComponent, HomeComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ComponentsModule
  ],
  providers:[]
})
export class WebsiteModule { }
