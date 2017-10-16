import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderHistoryComponent } from "./order-history.component";
import { OrderHistoryRoutes } from "./order-history.routing";
import { DeliveryService } from '../services/delivery.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OrderHistoryRoutes),
        FormsModule
    ],
    declarations: [OrderHistoryComponent],
    providers: [DeliveryService]
})

export class OrderHistoryModule {}
