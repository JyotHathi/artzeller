import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/interfaces/profile.interface';
import { OauthService } from '../../auth/services/oauth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  //#region GLOBAL VARIABLES
  _title = 'Account';
  _pageDescription =
    'This is the information we have for your account. Please review and let us know of any errors or discrepancies.';
  _accountInfo: any;
  tooltipText = 'Copy to clipboard'; // Default tooltip text

  //#endregion GLOBAL VARIABLES

  //#region COMPONENT METHODS
  constructor(
    private oauthSerivce: OauthService,
    private notificationService: NotificationService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}
  
  ngOnInit(): void {
    //this.getProfileDetails();
    this.getUserInfo();
  }
  //#endregion COMPONENT METHODS

  //#region FUNCTIONS

  getProfileDetails() {
    try {
      // this._accountInfo = [
      //   // { label: 'First Name', value: 'Utsav' },
      //   // { label: 'Last Name', value: 'Gupta' },
      //   // { label: 'API Key', value: 'jrw852395hh3453hsfaidf7rh23ihi23uh4234' },
      //   { label: 'Email', value: 'user@user.com' },
      //   { label: 'Account Creation Date', value: '01/02/2024 01:30 PM' },
      //   { label: 'Subscription Plan', value: 'Prepaid' },
      // ];
    } catch (error) {
      console.log('error occurred on getProfileDetails -->>', error);
    }
  }

  copyText(value: string) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        this.tooltipText = 'Copied!'; // Change tooltip text on success
        setTimeout(() => (this.tooltipText = 'Copy to clipboard'), 2000); // Reset tooltip text after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        // Optionally handle error case, perhaps changing the tooltip text to indicate failure
      });
  }

  getUserInfo(): void {
    const accessToken = localStorage.getItem('access_token')?.toString() || '';
    this.oauthSerivce
      .getUserInfo(accessToken)
      .then((response) => {
        console.log('response from account user info', response);
        this._accountInfo = response;
      })
      .catch((error) => {
        this.notificationService.showError('Error', error);
      });
  }

  logout(): void {
    this.oauthSerivce.logoutViaRedirect();
    //window.location.href = 'https://postman-pool.auth.ap-south-1.amazoncognito.com/logout?client_id=2ii3b4fie8q79qgba1p6mhj9hg&logout_uri=http%3A%2F%2Flocalhost%3A4200%2F&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code';
  }

  confirmLogout(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirmation',
        message: 'Are you sure you want to log out?'
      }
    }).onClose.subscribe(result => {
      if (result) {
        // User confirmed, perform logout action
        this.logout();
      }
    });
  }
  
  //#endregion FUNCTIONS
}
