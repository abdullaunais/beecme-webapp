import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { Constant } from '../services/constant';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    queryParams: any;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/home',
        title: 'Home',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/categories',
        title: 'Categories',
        type: 'sub',
        icontype: 'apps',
        collapse: 'categories',
        children: []
    }
    //     , {
    //     path: '/categories',
    //     title: 'Categories',
    //     type: 'link',
    //     icontype: 'apps'
    // }, {
    //     path: '/cart',
    //     title: 'My Cart',
    //     type: 'link',
    //     icontype: 'shopping_cart'
    // }, {
    //     path: '/orders',
    //     title: 'My Orders',
    //     type: 'link',
    //     icontype: 'timeline'
    // }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
    isLoading: boolean;
    isAvailable: boolean;
    isError: boolean;
    categories: Array<any> = [];
    city: any;

    public menuItems: any[];

    subscription: Subscription;
    user: any = {};
    isLogin: boolean = false;

    cartCount: number = 0;
    subCartSummary: Subscription;

    constructor(
        private sidebarService: SidebarService,
        private sharedService: SharedService,
        private deliveryService: DeliveryService,
        private storage: ObjectStorage
    ) {
        this.isLoading = true;
        this.isAvailable = true;
        this.isError = false;
        console.log('this.storage.get(location.set)  ' + this.storage.get(Constant.LOCATION_SET));
        if (this.storage.get(Constant.LOCATION_SET)) {
            this.city = this.storage.get(Constant.CITY);
        } else {
            return;
        }
        this.subCartSummary = this.sharedService.getSubjectCartSummary().subscribe((size: any) => { this.cartCount = size; });
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngAfterViewInit() {
        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            // const sidebar = $('.sidebar-wrapper');
            const sidebar = <HTMLElement>document.querySelector('.sidebar-wrapper');
            const psSidebar = new PerfectScrollbar(sidebar);

            const mainpanel = <HTMLElement>document.querySelector('.main-panel');
            const psMain = new PerfectScrollbar(mainpanel);
            // sidebar.perfectScrollbar();
            // if we are on windows OS we activate the perfectScrollbar function
            // $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }
    }

    ngOnInit() {
        this.initialize();
        // this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.subscription = this.sidebarService.userItem
            .subscribe((data: any) => {
                if (data.isLogin) {
                    this.isLogin = true;
                }
                this.user = data.user;
            });
    }

    initialize() {
        this.deliveryService.getCategories(this.city.id).catch((err): any => {
            this.isLoading = false;
            this.isError = true;
            console.log(err);
        }).subscribe((data: any) => {
            // let json = JSON.stringify(data);
            const catArray = data; // JSON.parse(json);
            // console.log('catgories '+ catArray);
            if (catArray) {
                if (catArray.length > 1) {
                    catArray.forEach((element: any) => {
                        const child: ChildrenItems = {
                            path: '/itemlist',
                            queryParams: {
                                category: element.categoryId
                            },
                            title: element.nameEn,
                            ab: '-'
                        };
                        ROUTES[1].children.push(child);
                        this.categories.push(element);
                    });

                    this.menuItems = ROUTES.filter(menuItem => menuItem);
                    this.updatePS();
                    console.log(this.menuItems);
                    // this.categories = data;
                    this.isAvailable = true;
                    this.isError = false;
                } else {
                    this.isAvailable = false;
                    this.isError = false;
                }
            } else {
                this.isAvailable = false;
                this.isError = false;
            }
            this.isLoading = false;
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
            const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
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
