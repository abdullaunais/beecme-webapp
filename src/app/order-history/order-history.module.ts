import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderHistoryComponent } from './order-history.component';
import { OrderHistoryRoutes } from './order-history.routing';
import { DeliveryService } from '../services/delivery.service';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OrderHistoryRoutes),
        ReactiveFormsModule,
        StarRatingModule.forRoot()
    ],
    declarations: [OrderHistoryComponent],
    providers: [DeliveryService]
})

export class OrderHistoryModule {}
