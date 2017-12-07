import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemsRoutes } from './items.routing';
import { ItemsComponent } from './items.component';
import { ItemListModule } from '../item-list/item-list.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
    imports: [
        ItemListModule,
        CommonModule,
        FormsModule,
        BreadcrumbModule,
        RouterModule.forChild(ItemsRoutes)
    ],
    declarations: [ItemsComponent]

})

export class ItemsModule {}
