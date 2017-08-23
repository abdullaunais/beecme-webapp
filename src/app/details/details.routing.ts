import { Routes } from '@angular/router';
import { DetailsComponent } from './details.component';

export const DetailsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: DetailsComponent
    }]
}
];
