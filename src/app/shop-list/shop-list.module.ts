import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopListRoutes } from './shop-list.routing';
import { ShopListComponent } from './shop-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ShopListRoutes),
        FormsModule
    ],
    declarations: [ShopListComponent]
})

export class ShopListModule {}
