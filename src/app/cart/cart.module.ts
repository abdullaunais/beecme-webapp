import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartRoutes } from './cart.routing';
import { CartComponent } from './cart.component';
import { MdSelectModule } from '@angular/material';
import { ShopInfoModule } from '../shop-info/shop-info.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CartRoutes),
        FormsModule,
        ShopInfoModule,
        MdSelectModule
    ],
    declarations: [CartComponent]
})

export class CartModule {}
