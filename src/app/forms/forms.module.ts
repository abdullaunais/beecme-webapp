import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MdDatepickerModule, MdInputModule, MdNativeDateModule } from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker'

import { FormsRoutes } from './forms.routing';

import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule,
    DatepickerModule
  ],
  declarations: [
      ExtendedFormsComponent,
      RegularFormsComponent,
      ValidationFormsComponent,
      WizardComponent
  ]
})

export class Forms {}
