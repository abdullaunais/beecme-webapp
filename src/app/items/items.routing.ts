import { Routes } from '@angular/router';
import { ItemsComponent } from './items.component';

export const ItemsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: ItemsComponent
        }]
    }
];
