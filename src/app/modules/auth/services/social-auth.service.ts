import { Injectable } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaAuthService {
  private user: BehaviorSubject<SocialUser | null> =
    new BehaviorSubject<SocialUser | null>(null);

  constructor(private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user) => {
      this.user.next(user);
    });
  }

  signInWithGoogle(): void {
    try {
      this.socialAuthService
        .signIn(GoogleLoginProvider.PROVIDER_ID)
        .then((userData) => {
          // You can perform further actions with the userData object, such as sending it to your backend
          console.log(userData);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  signOut(): void {
    this.socialAuthService
      .signOut()
      .then(() => {
        this.user.next(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUser(): Observable<SocialUser | null> {
    return this.user.asObservable();
  }
}
