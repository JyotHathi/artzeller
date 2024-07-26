import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { NotificationService } from 'src/app/services/notification.service';
import { VideoService } from 'src/app/services/video.service';
import { OauthService } from '../../auth/services/oauth.service';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.css',
})
export class CreateVideoComponent {
  //#region GLOBAL VARIABLES
  _title = 'Create a Video';
  _pageDescription =
    'Unlock the magic of effortless video creation with our one-click script, bringing your ideas to life with unparalleled ease and speed.';
  form: FormGroup;
  _btnLoading = false;
  _isAdmin = false;

  //#endregion GLOBAL VARIABLES

  //#region  CONSTRUCTOR & INITIALIZATION METHODS
  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private notificationService: NotificationService,
    private oauthService: OauthService
  ) {
    this.form = this.formBuilder.group({
      script: ['', [Validators.required]],
      variation: ['1', [Validators.required, Validators.maxLength(512)]],
      debug: ['true', [Validators.required, Validators.maxLength(512)]],
    });
  }

  ngOnInit() {
    // validate loggedim user role
    this.validateAdminRole(); // check if admin or not
  }

  //#endregion  CONSTRUCTOR & INITIALIZATION METHODS

  //#region CUSTOM METHODS
  onSubmit() {
    if (this.form.valid) {
      this._btnLoading = true;
      // Access the value of the script form control
      let scriptValue = this.form?.get('script')?.value || '';
      let variationValue = this._isAdmin
        ? this.form?.get('variation')?.value
        : undefined;
      let debugValue = this._isAdmin
        ? this.form?.get('debug')?.value
        : undefined;
      scriptValue = scriptValue.trim();
      if (scriptValue) {
        this.videoService
          .createVideo(scriptValue, variationValue, debugValue)
          .then((response) => {
            // success response
            console.log('API Response:', response);
            this._btnLoading = false;
            this.form?.get('script')?.setValue(''); // set the blank value after successful video
            this.notificationService.showSuccess(
              'Success',
              'Congrats! You successfully posted a video, check out your videos section or create another one here!'
            );
          })
          .catch((error) => {
            console.error('API Error:', error);
            this._btnLoading = false;
            // avoiding this error, as interceptor is already handling the error messages and notifications
            //this.notificationService.showError('Error' , error);
          })
          .finally(() => {
            this._btnLoading = false;
          });
      } else {
        // invalid script value, show an validation error
        this.notificationService.showWarning(
          'Warning',
          'Please enter a valid script text.'
        );
        this._btnLoading = false;
      }
    }
  }

  validateAdminRole(): void {
    try {
      this.oauthService
        .isAdmin()
        ?.then((isAdmin) => {
          this._isAdmin = isAdmin ? true : false;
          // Add max length validator dynamically
          const scriptControl: AbstractControl | null = this.form.get('script');
          if (scriptControl) {
            const maxLength = this._isAdmin ? 2048 : 512;
            scriptControl.setValidators([Validators.maxLength(maxLength)]);
            scriptControl.updateValueAndValidity();
          }
        })
        .catch((err) => {
          console.warn('Failed to check admin role', err);
        });
    } catch (err) {
      console.warn('Error while validating the admin role', err);
    }
  }

  //#endregion CUSTOM METHODS
}
