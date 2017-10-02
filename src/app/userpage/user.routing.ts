import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuardService } from '../services/auth-guard.service';

export const UserRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'pages/profile',
        component: UserComponent,
        canActivate: [AuthGuardService]
    }]
}
];
