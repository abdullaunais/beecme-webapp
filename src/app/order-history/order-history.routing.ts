import { Routes } from '@angular/router';
import { OrderHistoryComponent } from "./order-history.component";

export const OrderHistoryRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: OrderHistoryComponent
    }]
}
];
