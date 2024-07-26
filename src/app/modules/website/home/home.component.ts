import { Component } from '@angular/core';
import { SubscribeComponent } from '../components/subscribe/subscribe.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../../auth/services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  [x: string]: any;
  //#region  GLOBAL VARIABLES
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OauthService,
    private cryptoService: CryptoService
  ) {}
  //#endregion  GLOBAL VARIABLES

  //#region  INBUILT METHODS
  ngOnInit(): void {
    console.log('home component');
    // get token from auth code
    this.getTokenfromAuthCode();
  }
  //#endregion  INBUILT METHODS

  //#region CUSTOM METHODS
  getTokenfromAuthCode() {
    try {
      const code = this.route.snapshot.queryParams['code'];
      console.log('Code:', code);

      if (code) {
        // If authorization code found, exchange it for an access token
        this.oauthService.getToken(code).subscribe(
          (response) => {
            const accessToken = response.access_token;
            const refreshToken = response.refresh_token;
            // decode token to check if the loggedin user is in admin group or not.
            const decodedToken: any = jwtDecode(accessToken);
            if (
              decodedToken &&
              decodedToken['cognito:groups'] &&
              decodedToken['cognito:groups'].length > 0 &&
              decodedToken['cognito:groups'].includes('Admin')
            ) {
              // loggedin user is in admin group
              let encryptedString = this.cryptoService.toEncrypt('admin');
              localStorage.setItem('rl', encryptedString);
            }
            // store the access token & refresh token in local storage or a service
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            // Redirect to a protected route or perform other actions
            this.router.navigate(['/dashboard/videos/get']);
          },
          (error) => {
            console.error('Error obtaining access token:', error);
            // Handle error, e.g., display an error message to the user
          }
        );
      }
    } catch (err) {
      console.log('error occurred', err);
    }
  }

  //#endregion CUSTOM METHODS
}
