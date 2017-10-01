import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { LogoutComponent } from './logout/logout.component';

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
                component: RegisterComponent
            }
            // , {
            //     path: 'pricing',
            //     component: PricingComponent
            // }
        ]
    }
];
