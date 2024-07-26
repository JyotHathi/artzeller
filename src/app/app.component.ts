import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from './modules/auth/services/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //#region GLOBAL VARIABLES
  title = 'Mithya';

  //#endregion GLOBAL VARIABLES

  //#region INBUILT METHODS
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OauthService
  ) {
    console.log(this.router.config);
  }

  ngOnInit(): void {
    console.log('app component');
  }
  //#endregion INBUILT METHODS

  //#region CUSTOM METHODS

  //#endregion CUSTOM METHODS
}
