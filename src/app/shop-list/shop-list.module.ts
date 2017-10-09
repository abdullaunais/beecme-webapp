import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopListRoutes } from './shop-list.routing';
import { ShopListComponent } from './shop-list.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ShopListRoutes),
        FormsModule,
        BreadcrumbModule
    ],
    declarations: [ShopListComponent]
})

export class ShopListModule {}
