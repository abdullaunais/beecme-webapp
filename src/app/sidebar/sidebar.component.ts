import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Subscription } from 'rxjs';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/home',
    title: 'Home',
    type: 'link',
    icontype: 'dashboard'
}
    // ,{
    //     path: '/components',
    //     title: 'Components',
    //     type: 'sub',
    //     icontype: 'apps',
    //     children: [
    //         {path: 'buttons', title: 'Buttons', ab:'B'},
    //         {path: 'grid', title: 'Grid System', ab:'GS'},
    //         {path: 'panels', title: 'Panels', ab:'P'},
    //         {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
    //         {path: 'notifications', title: 'Notifications', ab:'N'},
    //         {path: 'icons', title: 'Icons', ab:'I'},
    //         {path: 'typography', title: 'Typography', ab:'T'}
    //     ]
    // }
    , {
    path: '/categories',
    title: 'Categories',
    type: 'link',
    icontype: 'apps'
}, {
    path: '/cart',
    title: 'My Cart',
    type: 'link',
    icontype: 'shopping_cart'
}, {
    path: '/orders',
    title: 'My Orders',
    type: 'link',
    icontype: 'timeline'
}
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    subscription: Subscription;
    user: any = {};
    isLogin: boolean = false;
    isProfilePictureError: boolean = false;

    constructor(
        private sidebarService: SidebarService
    ) {

    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            const $sidebar = $('.sidebar-wrapper');
            $sidebar.perfectScrollbar();
            // if we are on windows OS we activate the perfectScrollbar function
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.subscription = this.sidebarService.userItem
            .subscribe((data: any) => {
                if(data.isLogin) {
                    this.isLogin = true;
                }
                this.user = data.user
            });
    }

    profilePicError() {
        // console.log('Profile Picture Error');
        this.isProfilePictureError = true;
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }
}
