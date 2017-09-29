import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,

        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'categories',
                loadChildren: './categories/categories.module#CategoriesModule',
            }, {
                path: 'cart',
                loadChildren: './cart/cart.module#CartModule',
            }, {
                path: 'orders',
                loadChildren: './order-history/order-history.module#OrderHistoryModule',
            }, {
                path: 'category/:id',
                loadChildren: './shop-list/shop-list.module#ShopListModule',
            }, {
                path: 'shop/:id',
                loadChildren: './item-list/item-list.module#ItemListModule',
            }, {
                path: 'shop/:shopid/item/:itemid',
                loadChildren: './details/details.module#DetailsModule',
            },
            // , { 
            //     path: 'components', 
            //     loadChildren: './components/components.module#ComponentsModule' 
            // }, { 
            //     path: 'forms', 
            //     loadChildren: './forms/forms.module#Forms' 
            // }, { 
            //     path: 'tables', 
            //     loadChildren: './tables/tables.module#TablesModule' 
            // }, { 
            //     path: 'widgets', 
            //     loadChildren: './widgets/widgets.module#WidgetsModule' 
            // }, { 
            //     path: 'calendar', 
            //     loadChildren: './calendar/calendar.module#CalendarModule' 
            // }, 
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }
            // , { 
            //     path: '', 
            //     loadChildren: './timeline/timeline.module#TimelineModule' 
            // } 
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }
];
