import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutes } from './categories.routing';
import { CategoriesComponent } from './categories.component';
import { CategoryListModule } from "../category-list/category-list.module";
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
    imports: [
        CategoryListModule,
        CommonModule,
        RouterModule.forChild(CategoriesRoutes),
        FormsModule,
        BreadcrumbModule
    ],
    declarations: [CategoriesComponent]
})

export class CategoriesModule {}
