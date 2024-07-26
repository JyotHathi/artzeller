import { Component } from '@angular/core';
import { OauthService } from 'src/app/modules/auth/services/oauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  //#region GLOBAL VARIABLES
  userName: any;

  //#endregion GLOBAL VARIABLES

  //#region INBUILT METHODS
  constructor(private oauthService: OauthService) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.userName = this.oauthService.getUserName(accessToken);
      console.log(this.userName, '<<<username response');
      if (!this.userName) {
        console.log('username', this.userName);
      }
    }
  }

  //#endregion INBUILT METHODS
}
