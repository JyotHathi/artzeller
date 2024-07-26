import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { ConnectionsComponent } from './connections/connections.component';
import { AccountComponent } from './account/account.component';
import { PlanQouteComponent } from './plan-qoute/plan-qoute.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import { GetVideosComponent } from './get-videos/get-videos.component';
import { authGuard } from 'src/app/shared/auth/auth.guard';
import { adminAuthGuard } from 'src/app/shared/auth/admin-auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';

const getVideoPagedesc =
  'Welcome to our Arts video page, your ultimate destination for exploring the vibrant world of creativity and expression. Dive into a diverse collection of videos that showcase the beauty and power of visual arts!';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // {
      //   path: 'plan-qoute',
      //   component: PlanQouteComponent,
      //   canActivate: [authGuard],
      // },
      { path: 'movies', component: MoviesComponent, canActivate: [authGuard] },
      {
        path: 'connections',
        component: ConnectionsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [authGuard],
        data: {
          title: 'My Account',
          description:
            'Explore new features, exclusive offers, and personalized recommendations designed just for you.',
        },
      },
      {
        path: 'videos/create',
        component: CreateVideoComponent,
        canActivate: [adminAuthGuard],
        data: {
          title: 'Create a Video',
          description:
            'Unlock the magic of effortless video creation with our one-click script, bringing your ideas to life with unparalleled ease and speed.',
        },
      },
      {
        path: 'videos/get',
        component: GetVideosComponent,
        canActivate: [authGuard],
        data: {
          title: 'Explore the World of Arts',
          description: getVideoPagedesc,
        },
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard],
        data: {
          title: 'Complete Your Purchase',
          description: 'Review your order details and enter payment information securely to complete your shopping experience.',
        },
      },
      {
        path: 'payment/success',
        component: PaymentSuccessComponent,
        canActivate: [authGuard],
        data: {
          title: 'Payment Successful',
          description: '',
        },
      },
      {
        path: 'payment/failure',
        component: PaymentFailureComponent,
        canActivate: [authGuard],
        data: {
          title: 'Payment Failed',
          description: '',
        },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [authGuard],
      },
      {
        path: '**',
        redirectTo: 'videos/get',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'videos/get',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
