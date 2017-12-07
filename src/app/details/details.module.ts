import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailsRoutes } from './details.routing';
import { DetailsComponent } from './details.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { DeliveryService } from '../services/delivery.service';
import { ShopInfoModule } from '../shop-info/shop-info.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {ImageZoomModule} from 'angular2-image-zoom';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DetailsRoutes),
        FormsModule,
        BreadcrumbModule,
        ImageZoomModule,
        ShopInfoModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [DetailsComponent],
    providers: [DeliveryService]
})

export class DetailsModule {}
