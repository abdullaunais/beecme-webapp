import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopListRoutes } from './shop-list.routing';
import { ShopListComponent } from './shop-list.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { ShopInfoModule } from "../shop-info/shop-info.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ShopListRoutes),
        FormsModule,
        ShopInfoModule,
        BreadcrumbModule
    ],
    declarations: [ShopListComponent],
    exports: [ShopListComponent]
})

export class ShopListModule {}
