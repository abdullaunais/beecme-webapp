import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbModule,
        RouterModule.forChild(UserRoutes),
        FormsModule, ReactiveFormsModule
    ],
    declarations: [UserComponent]
})

export class UserModule {}
