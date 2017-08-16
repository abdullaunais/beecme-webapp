import { Routes } from '@angular/router';
import { ShopListComponent } from './shop-list.component';

export const ShopListRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: ShopListComponent
    }]
}
];
