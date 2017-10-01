import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { LogoutComponent } from './logout/logout.component';
import { LocationGuardService } from '../services/location-guard.service';

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
            }
            // , {
            //     path: 'pricing',
            //     component: PricingComponent
            // }
        ]
    }
];
