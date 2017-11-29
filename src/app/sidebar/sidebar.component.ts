import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';

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

export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
    public menuItems: any[];

    subscription: Subscription;
    user: any = {};
    isLogin: boolean = false;

    cartCount: number = 0;
    subCartSummary: Subscription;

    constructor(
        private sidebarService: SidebarService,
        private sharedService: SharedService
    ) {
        this.subCartSummary = this.sharedService.getSubjectCartSummary().subscribe((size: any) => { this.cartCount = size; });
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngAfterViewInit() {
        let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            //const sidebar = $('.sidebar-wrapper');
            const sidebar = <HTMLElement>document.querySelector('.sidebar-wrapper');
            const psSidebar = new PerfectScrollbar(sidebar);

            const mainpanel = <HTMLElement>document.querySelector('.main-panel');
            const psMain = new PerfectScrollbar(mainpanel);
            //sidebar.perfectScrollbar();
            // if we are on windows OS we activate the perfectScrollbar function
            //$('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.subscription = this.sidebarService.userItem
            .subscribe((data: any) => {
                if (data.isLogin) {
                    this.isLogin = true;
                }
                this.user = data.user;
            });
    }

    profilePicError() {
        this.user.profilePicture = '/assets/img/profile_default_grey.webp';
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.subCartSummary.unsubscribe();
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }


    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
