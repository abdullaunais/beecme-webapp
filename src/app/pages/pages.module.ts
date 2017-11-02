import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { LogoutComponent } from './logout/logout.component';
import { MdSelectModule } from '@angular/material';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Error404Component } from './error-404/error-404.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdSelectModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LocationComponent,
    LogoutComponent,
    Error404Component
  ]
})

export class PagesModule {}
