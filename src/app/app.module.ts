import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarService,
  NbTagModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { WebsiteModule } from './modules/website/website.module';
import { TokenValidateService } from './shared/auth/auth.guard';
import { VideoService } from './services/video.service';
import { httpInterceptor } from './shared/interceptors/http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationDialogComponent } from './shared/components/dialogs/confirmation/confirmation.component';
import { AdminRoleValidateService } from './shared/auth/admin-auth.guard';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { RazorpayService } from './services/razor-pay.service';
import { DeviceDetectionService } from './services/device-detection.service';

@NgModule({
  declarations: [AppComponent,ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    DashboardModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    AuthModule,
    WebsiteModule,
    NbToastrModule.forRoot(),
    NbAutocompleteModule,
    NbTagModule,
    MarketplaceModule
  ],
  providers: [
    NbSidebarService,
    NbMenuService,
    TokenValidateService,
    AdminRoleValidateService,
    VideoService,
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
    RazorpayService,
    DeviceDetectionService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
