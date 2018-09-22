import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemListComponent } from './item-list.component';
// import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        // BreadcrumbModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [ItemListComponent],
    exports: [ItemListComponent]
})

export class ItemListModule {}
