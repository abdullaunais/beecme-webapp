import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LocationGuardService } from './services/location-guard.service';
import { AuthGuardService } from './services/auth-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [LocationGuardService]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [LocationGuardService],
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
                canActivate: [AuthGuardService]
            }, {
                path: 'orders',
                loadChildren: './order-history/order-history.module#OrderHistoryModule',
                canActivate: [AuthGuardService]
            }, {
                path: 'category',
                loadChildren: './shop-list/shop-list.module#ShopListModule',
            }, {
                path: 'items',
                loadChildren: './items/items.module#ItemsModule',
            }, {
                path: 'details',
                loadChildren: './details/details.module#DetailsModule',
            }, {
                path: 'search',
                loadChildren: './search-list/search-list.module#SearchListModule',
            }, {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule',
            },
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/pages/404'
    }
];
