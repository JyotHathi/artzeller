import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OauthService } from 'src/app/modules/auth/services/oauth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  return inject(AdminRoleValidateService).canActivate();
};

@Injectable()
export class AdminRoleValidateService {
  constructor(private oauthService: OauthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        console.log('in admin auth');
        // Token exists, validate it
        const isValid = await this.oauthService.validateToken(accessToken);
        if (isValid) {
          // Token is valid, then check for the admin role
          try {
            this.oauthService
              .isAdmin()
              ?.then((isAdmin) => {
                if (isAdmin) {
                  // admin role
                  console.log('in admin auth , isAdmin true');
                  return true;
                } else {
                  // not loggedin as admin role
                  this.router.navigate(['/dashboard']);
                  return false;
                //   console.log('in admin auth , isAdmin false');
                //   return false;
                }
              })
              .catch((err) => {
                console.log('in admin auth , catch false');
                console.warn('Failed to check admin role', err);
                return false;
              });
          } catch (err) {
            console.log('in admin auth ,main catch false');
            console.warn('Error while validating the admin role', err);
            return false;
          }
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
