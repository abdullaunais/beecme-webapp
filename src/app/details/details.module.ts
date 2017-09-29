import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailsRoutes } from './details.routing';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DetailsRoutes),
        FormsModule
    ],
    declarations: [DetailsComponent]
})

export class DetailsModule {}
