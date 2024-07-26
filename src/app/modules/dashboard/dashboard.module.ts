import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbDialogService,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbTableModule,
  NbTabsetModule,
  NbTagModule,
  NbToastrService,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConnectionsComponent } from './connections/connections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateVideoComponent } from './create-video/create-video.component';
import { GetVideosComponent } from './get-videos/get-videos.component';
import { AdminModule } from './admin/admin.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';

@NgModule({
  declarations: [DashboardComponent, MoviesComponent, ConnectionsComponent, AccountComponent, CreateVideoComponent, GetVideosComponent, CheckoutComponent, PaymentSuccessComponent, PaymentFailureComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbLayoutModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule,
    NbDatepickerModule,
    NbCardModule,
    NbSelectModule,
    NbTableModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NbButtonModule,
    NbSpinnerModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbFormFieldModule,
    NbUserModule,
    NbContextMenuModule,
    ReactiveFormsModule,
    NbListModule,
    NbTooltipModule,
    NbInputModule,
    NbFormFieldModule,
    NbBadgeModule,
    NbTabsetModule,
    FormsModule,
    AdminModule,
    NbAutocompleteModule,
    NbTagModule,
    
  ],
  providers: [NbSidebarService, NbMenuService, NbToastrService, NbDialogService],
})
export class DashboardModule {}
