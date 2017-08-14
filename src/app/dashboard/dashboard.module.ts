import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { CategoryListModule } from "../category-list/category-list.module";

@NgModule({
    imports: [
        CategoryListModule,
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule
    ],
    declarations: [DashboardComponent]
})

export class DashboardModule {}
