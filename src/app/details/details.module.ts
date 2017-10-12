import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailsRoutes } from './details.routing';
import { DetailsComponent } from './details.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { CartService } from '../cart/cart.service';
import { DeliveryService } from '../services/delivery.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DetailsRoutes),
        FormsModule,
        BreadcrumbModule
    ],
    declarations: [DetailsComponent],
    providers: [DeliveryService, CartService]
})

export class DetailsModule {}
