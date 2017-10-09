import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemListRoutes } from './item-list.routing';
import { ItemListComponent } from './item-list.component';
import { ShopInfoModule } from '../shop-info/shop-info.module';
import { ShopInfoComponent } from '../shop-info/shop-info.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
// import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ItemListRoutes),
        FormsModule,
        ShopInfoModule,
        BreadcrumbModule
    ],
    declarations: [ItemListComponent, ShopInfoComponent]
})

export class ItemListModule {}
