import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list.component';

export const ItemListRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: ItemListComponent
    }]
}
];
