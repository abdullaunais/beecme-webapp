import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { LogoutComponent } from './logout/logout.component';
import { LocationGuardService } from '../services/location-guard.service';
import { Error404Component } from './error-404/error-404.component';

export const PagesRoutes: Routes = [

    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent
            }, {
                path: 'logout',
                component: LogoutComponent,
            }, {
                path: 'location',
                component: LocationComponent
            }, {
                path: 'register',
                component: RegisterComponent,
                canActivate: [LocationGuardService],
            }, {
                path: '404',
                component: Error404Component 
            }
            // , {
            //     path: 'pricing',
            //     component: PricingComponent
            // }
        ]
    }
];
