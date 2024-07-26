import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OauthService } from 'src/app/modules/auth/services/oauth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(TokenValidateService).canActivate();
};

@Injectable()
export class TokenValidateService {
  constructor(private oauthService: OauthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        // Token exists, validate it
        const isValid = await this.oauthService.validateToken(accessToken);
        if (isValid) {
          // Token is valid, allow access to the route
          return true;
        } else {
          // Token is invalid, redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
      } else {
        // No token found, redirect to login page
        this.router.navigate(['/login']);
        return false;
      }
    } catch (err) {
      console.log('error occured', err);
      return false;
    }
  }
}
