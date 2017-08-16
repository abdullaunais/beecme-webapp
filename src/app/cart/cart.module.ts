import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartRoutes } from './cart.routing';
import { CartComponent } from './cart.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CartRoutes),
        FormsModule
    ],
    declarations: [CartComponent]
})

export class CartModule {}
