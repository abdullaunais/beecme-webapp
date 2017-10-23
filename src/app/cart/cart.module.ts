import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CartRoutes } from './cart.routing';
import { CartComponent } from './cart.component';
import { MdSelectModule } from '@angular/material';
import { ShopInfoModule } from '../shop-info/shop-info.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CartRoutes),
        FormsModule,        
        ReactiveFormsModule,
        ShopInfoModule,
        MdSelectModule,
        BreadcrumbModule
    ],
    declarations: [CartComponent]
})

export class CartModule {}
