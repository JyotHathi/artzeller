import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: NbToastrService) {}

  showError(title: string, message: string, ) {
    this.toastrService.danger(message, title, { icon: 'slash-outline' });
  }

  showSuccess(title: string, message: string, ) {
    this.toastrService.success(message, title);
  }

  showWarning(title: string, message: string, ) {
    this.toastrService.warning(message, title);
  }
}
