import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
})
export class ConfigComponent {
  //#region GLOBAL VARIABLES
  _title = 'Site Configuration';
  form!: FormGroup;

  //#endregion GLOBAL VARIABLES

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm(): void {
    this.form = this.fb.group({
      debug: ['true', [Validators.required, Validators.maxLength(256)]],
      variation: ['1', [Validators.required, Validators.maxLength(256)]],
    });
  }

  saveForm(): void {
    if (this.form?.valid) {
      // Perform save action here
      console.log('Form is valid and ready for submission:', this.form.value);
    } else {
      // Mark all fields as touched to display error messages
      //Object.values(this.form.controls).forEach(control => control.markAsTouched());
    }
  }

  onSubmit() {}
}
