import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule } from '@nebular/theme';



@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NbCardModule,
    ReactiveFormsModule,
    NbInputModule,
    NbLayoutModule,
    NbButtonModule,
    
  ]
})
export class AdminModule { }
