import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/website/signup/signup.component';
import { OauthLoginComponent } from './modules/auth/oauth-login/oauth-login.component';
import { authGuard } from './shared/auth/auth.guard';
const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // all dashboard routes will be managed here
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./modules/dashboard/dashboard.module').then(
  //       (m) => m.DashboardModule
  //     ),
  //     canActivate: [authGuard]
  // },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./modules/website/website.module').then((m) => m.WebsiteModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./modules/marketplace/marketplace.module').then(
        (m) => m.MarketplaceModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
