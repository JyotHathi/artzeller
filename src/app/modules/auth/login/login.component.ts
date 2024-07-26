import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OauthService } from '../services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //#region GLOBAL VARIABLES

  // login form with validation rules
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(250),
    ]),
    apiKey: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
    ]),
    rememberMe: new FormControl(false),
  });

  loginData = {
    email: '',
    apiKey: '',
  };

  rememberMe: boolean = false;

  //#endregion GLOBAL VARIABLES

  //#region COMPONENT EVENTS
  constructor(private router: Router, private oauthService: OauthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      apiKey: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  //#endregion COMPONENT EVENTS

  //#region FUNCTIONS
  loginWithSSO() {
    try {
      // redirect to the oauth SSO page of AWS cognito
      this.oauthService.signInWithOAuthSSO();
    } catch (err) {
      console.log('error occured', err);
    }
  }
  //#region FUNCTIONS
}
