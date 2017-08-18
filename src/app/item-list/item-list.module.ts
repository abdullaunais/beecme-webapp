import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemListRoutes } from './item-list.routing';
import { ItemListComponent } from './item-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ItemListRoutes),
        FormsModule
    ],
    declarations: [ItemListComponent]
})

export class ItemListModule {}
