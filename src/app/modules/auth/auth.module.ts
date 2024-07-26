import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { OauthService } from './services/oauth.service';
import { HttpClientModule } from '@angular/common/http';
import { OauthLoginComponent } from './oauth-login/oauth-login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginComponent, OauthLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers:[OauthService]
})
export class AuthModule { }
