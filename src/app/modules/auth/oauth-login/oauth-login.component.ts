import { Component } from '@angular/core';
import { OauthService } from '../services/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oauth-login',
  templateUrl: './oauth-login.component.html',
  styleUrl: './oauth-login.component.css',
})
export class OauthLoginComponent {
  constructor(private oauthService: OauthService, private router: Router) {}

  signInWithOAuth(): void {
    // Replace 'YOUR_AUTHORIZATION_CODE' with the actual authorization code obtained from the OAuth2 flow
    const code = 'YOUR_AUTHORIZATION_CODE';

    this.oauthService.getToken(code).subscribe(
      (response) => {
        const accessToken = response.access_token;
        // Handle the obtained access token (e.g., store it securely and redirect to a protected route)
        console.log('Access token:', accessToken);
        this.router.navigate(['/dashboard']); // Redirect to dashboard after successful authentication
      },
      (error) => {
        console.error('Error obtaining access token:', error);
      }
    );
  }

  signIn(): void {
    try {
      this.oauthService.signInWithOAuthSSO();
    } catch (err) {}
  }
}
