import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderHistoryComponent } from "./order-history.component";
import { OrderHistoryRoutes } from "./order-history.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OrderHistoryRoutes),
        FormsModule
    ],
    declarations: [OrderHistoryComponent]
})

export class OrderHistoryModule {}
