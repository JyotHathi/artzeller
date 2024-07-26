import { Component, Inject } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <nb-card>
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        {{ message }}
      </nb-card-body>
      <nb-card-footer class="confirmation-footer">
        <button nbButton  class="custom-primary-button"  (click)="close(true)">Yes</button>
        <button nbButton  status="default" (click)="close(false)">No</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationDialogComponent {

  title: string | undefined;
  message: string | undefined;

  constructor(protected dialogRef: NbDialogRef<ConfirmationDialogComponent>) {}

  close(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
