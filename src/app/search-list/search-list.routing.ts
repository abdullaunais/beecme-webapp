import { Routes } from '@angular/router';
import { SearchListComponent } from './search-list.component';

export const SearchListRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: SearchListComponent
    }]
}
];
