import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { CryptoService } from 'src/app/services/crypto.service';
@Injectable({
  providedIn: 'root',
})
export class OauthService {
  //#region  GLOBAL_VARIABLES
  private readonly _clientId = environment.clientId;
  private readonly _clientSecret = environment.clientSecret;
  private readonly _authUrl = environment.authUrl;
  private readonly _tokenUrl = environment.tokenUrl; // to aquire token from auth code
  private readonly _redirectUrl = environment.redirectUrl;
  private readonly _userInfoUrl = environment.userInfoUrl;
  private readonly _logoutUrl = environment.logoutUrl;

  //#endregion  GLOBAL_VARIABLES

  //#region  INBUILT METHODS
  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  //#endregion  INBUILT METHODS

  //#region CUSTOM_METHODS

  // to get token from authorization code (provided by oauth with redirect url)
  getToken(code: string): Observable<any> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(this._clientId + ':' + this._clientSecret), // convert client id and secret to base64 string
      });

      const body = new HttpParams()
        .set('grant_type', 'authorization_code')
        .set('code', code)
        .set('redirect_uri', this._redirectUrl);

      return this.http.post<any>(this._tokenUrl, body.toString(), { headers });
    } catch (err) {
      throw err;
    }
  }

  // get token using client credentials
  // not in use currently
  getTokenUsingClientCredentials(): Observable<any> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(this._clientId + ':' + this._clientSecret),
      });
      const body = new HttpParams().set('grant_type', 'client_credentials');
      return this.http.post<any>(this._tokenUrl, body.toString(), { headers });
    } catch (err) {
      console.log('error occured', err);
      throw err;
    }
  }

  // redirect to the signup/login page of aws cognito SSO
  signInWithOAuthSSO(): void {
    try {
      const clientId = this._clientId;
      const redirectUri = encodeURIComponent(this._redirectUrl);
      const authUrl = this._authUrl;
      const SSO_URL = `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = SSO_URL;
    } catch (err) {
      console.log('error occured', err);
      throw err;
    }
  }

  // get user information from the token
  async getUserName(accessToken: string): Promise<string | null> {
    try {
      const decodedToken: any = jwtDecode(accessToken);
      //return decodedToken['cognito:username']; // Adjust the claim name as per Cognito configuration

      this.validateToken(accessToken)
        .then((data) => {
          // temporary username as string
          // that means logged In user
          console.log('username return');
          return 'Username';
        })
        .catch((err) => {
          // token is not valid and returning null as username
          return null;
        })
        .finally(() => {
          return null;
        });
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // If token refresh fails, return null
      return null;
    }
  }

  getUserInfo(accessToken: string): Promise<any> {
    try {
      let apiUrl = this._userInfoUrl;

      if (!accessToken) {
        return Promise.reject('Unauthorized operation');
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*', //Access-Control-Allow-Origin
      });

      return new Promise((resolve, reject) => {
        this.http.get(apiUrl, { headers }).subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    } catch (err) {
      throw err;
    }
  }

  // deprecated !!
  logout(): Promise<any> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('rl');
    //let logoutUrl = this.logoutUrl + this.clientId;
    let logoutUrl =
      'https://postman-pool.auth.ap-south-1.amazoncognito.com/oauth2/logout?client_id=2ii3b4fie8q79qgba1p6mhj9hg&logout_uri=https://json2video.vercel.app/';
    let headers: {
      'Content-Type': 'application/json';
      'Access-Control-Allow-Origin': '*'; //Access-Control-Allow-Origin
      // Include any additional headers if needed
    };
    return new Promise((resolve, reject) => {
      this.http.get(logoutUrl, { headers }).subscribe({
        next: (response) => {
          console.log('logout response', response);
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  logoutViaRedirect(): void {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('rl');
      let logoutUrl =
        this._logoutUrl +
        '?client_id=' +
        this._clientId +
        '&redirect_uri=' +
        this._redirectUrl +
        '&logout_uri=' +
        this._redirectUrl +
        '&response_type=code';
      window.location.href = logoutUrl;
    } catch (err) {
      console.log('Error occured while logout', err);
    }
  }

  // to validate the token
  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // Make request to Cognito UserInfo endpoint to validate token
      const userInfo = await this.http
        .get<any>(this._userInfoUrl, { headers })
        .toPromise();
      // If response is successful, token is valid
      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;

      // If error occurs or token is invalid, try refreshing the token
      //const oldRefreshToken = localStorage.getItem('refresh_token') || '';
      //const refreshedToken = await this.refreshToken(oldRefreshToken);
      // if (refreshedToken) {
      //   // Retry validation with refreshed token
      //   return await this.validateToken(refreshedToken);
      // } else {
      //   // If refresh fails, token is invalid
      //   return false;
      // }
    }
  }

  async refreshToken(accessToken: string): Promise<string | null> {
    try {
      const body = new URLSearchParams();
      body.set('grant_type', 'refresh_token');
      body.set('client_id', this._clientId);
      body.set('client_secret', this._clientSecret);
      body.set('refresh_token', accessToken);

      // Make request to Cognito token refresh endpoint
      const response = await this.http
        .post<any>(this._tokenUrl, body.toString())
        .toPromise();
      const refreshedToken = response.access_token;
      console.log('token is refreshed', refreshedToken);
      // If token refresh is successful, return the new token
      return refreshedToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // If token refresh fails, return null
      return null;
    }
  }

  isAdmin(): Promise<any> | undefined {
    try {
      // check if loggedin user is admin or not
      let encryptedRole = localStorage.getItem('rl');
      let decryptedRole = this.cryptoService.toDecrypt(encryptedRole);
      console.log('wwerwerwerwrwerew', decryptedRole);
      if (decryptedRole && decryptedRole === 'admin') {
        // admin role
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (err) {
      console.log('Error occurred while checking the roles', err);
      return Promise.reject(false);
    }
  }

  //#endregion CUSTOM_METHODS
}
