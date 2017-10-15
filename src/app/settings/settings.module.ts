import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SettingsRoutes } from './settings.routing';
import { ObjectStorage } from '../utilities/object-storage';
import { MdSelectModule } from '@angular/material';
import { DeliveryService } from '../services/delivery.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRoutes),
    FormsModule,
    MdSelectModule,
    BreadcrumbModule,
  ],
  declarations: [SettingsComponent],
  providers: [ObjectStorage, DeliveryService]
})
export class SettingsModule { }
