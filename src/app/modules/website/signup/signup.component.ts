import { Component } from '@angular/core';
import { SocialMediaAuthService } from '../../auth/services/social-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor() {}

  signInWithGoogle(): void {
    //this.authService.signInWithGoogle(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {}

  name = '';

  onSubmit(form: any): void {
    console.log('Form Data: ', form.value);
  }
}
