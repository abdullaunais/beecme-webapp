import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { CategoryListModule } from '../category-list/category-list.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { DeliveryService } from '../services/delivery.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CategoryListModule,
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        BreadcrumbModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [DashboardComponent],
    providers: [DeliveryService]
})

export class DashboardModule {}
