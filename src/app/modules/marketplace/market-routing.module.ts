import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtsListComponent } from './arts-list/arts-list.component';
import { MarketplaceComponent } from './marketplace.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { SuccessComponent } from './payment/success/success.component';
import { FailureComponent } from './payment/failure/failure.component';
import { ArtsV2Component } from './arts-v2/arts-v2.component';

const getVideoPagedesc =
  'Welcome to our Arts video page, your ultimate destination for exploring the vibrant world of creativity and expression. Dive into a diverse collection of videos that showcase the beauty and power of visual arts!';
const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    children: [
      {
        path: '',
        component: ArtsListComponent,
        data: {
          title: 'Welcome to Artzeller',
          description:
            'Explore new features, exclusive offers, and personalized recommendations designed just for you.',
        },
      },
      // {
      //   path: 'arts',
      //   component: ArtsV2Component,
      //   data: {
      //     title: 'Welcome to Artzeller',
      //     description:
      //       'Explore new features, exclusive offers, and personalized recommendations designed just for you.',
      //   },
      // },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Welcome to Artzeller',
          description:
            'Explore new features, exclusive offers, and personalized recommendations designed just for you.',
        },
      },
      {
        path: 'payment/success',
        component: SuccessComponent,
        data: {
          title: 'Payment Successful',
          description: '',
        },
      },
      {
        path: 'payment/failure',
        component: FailureComponent,
        data: {
          title: 'Payment Failed',
          description: '',
        },
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketPlaceRoutingModule {}
