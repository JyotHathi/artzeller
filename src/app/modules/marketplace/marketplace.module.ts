import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../website/components/components.module';
import { MarketPlaceRoutingModule } from './market-routing.module';
import { NbAutocompleteModule, NbBadgeModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbDatepickerModule, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbMenuService, NbSelectModule, NbSidebarModule, NbSidebarService, NbSpinnerModule, NbTableModule, NbTabsetModule, NbTagModule, NbToastrService, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminModule } from '../dashboard/admin/admin.module';
import { ArtsListComponent } from './arts-list/arts-list.component';
import { MarketplaceComponent } from './marketplace.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { SuccessComponent } from './payment/success/success.component';
import { FailureComponent } from './payment/failure/failure.component';
import { ArtsV2Component } from './arts-v2/arts-v2.component';

@NgModule({
  declarations: [HomeComponent, ArtsListComponent, MarketplaceComponent, CheckoutComponent, SuccessComponent, FailureComponent, ArtsV2Component],
  imports: [
    CommonModule,
    ComponentsModule,
    MarketPlaceRoutingModule,
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
export class MarketplaceModule {}
