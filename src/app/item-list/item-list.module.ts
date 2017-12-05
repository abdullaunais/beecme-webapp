import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemListRoutes } from './item-list.routing';
import { ItemListComponent } from './item-list.component';
import { ShopInfoModule } from '../shop-info/shop-info.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ItemListRoutes),
        FormsModule,
        ShopInfoModule,
        BreadcrumbModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [ItemListComponent],
    exports: [ItemListComponent]
})

export class ItemListModule {}
