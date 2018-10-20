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
    icon: string;
    // icon: string;
    queryParams?: any;
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
        path: '/category',
        queryParams: { category: 1000 },
        title: 'Live Fish',
        type: 'link',
        icon: 'fas fa-fish',
        // collapse: 'categoryLF',
        // children: [
        //     {
        //         title: 'Live Fish',
        //         path: '/category',
        //         queryParams: { category: 1000 },
        //         ab: '1'
        //     },
        // ]
    },
    {
        path: 'categoryDT',
        title: 'Fish Food',
        type: 'sub',
        icon: 'fas fa-cookie-bite',
        collapse: 'categoryDT',
        children: [
            {
                title: 'Disease Treatment',
                path: '/category',
                queryParams: { category: 2100 },
                ab: '1'
            },
            {
                title: 'Feeders',
                path: '/category',
                queryParams: { category: 2200 },
                ab: '2'
            },
            {
                title: 'Food',
                path: '/category',
                queryParams: { category: 2300 },
                ab: '3'
            },
            {
                title: 'Water Care',
                path: '/category',
                queryParams: { category: 2400 },
                ab: '4'
            },
        ]
    },
    {
        path: 'categoryAT',
        title: 'Aquariums / Tanks',
        type: 'sub',
        icon: 'fab fa-servicestack',
        collapse: 'categoryAT',
        children: [
            {
                title: 'Tank',
                path: '/category',
                queryParams: { category: 3100 },
                ab: '1'
            },
            {
                title: 'Tank Roof',
                path: '/category',
                queryParams: { category: 3200 },
                ab: '2'
            },
            {
                title: 'Tank Stand',
                path: '/category',
                queryParams: { category: 3300 },
                ab: '3'
            },
        ]
    },
    {
        path: 'categoryFP',
        title: 'Filters & Pumps',
        type: 'sub',
        icon: 'fas fa-filter',
        collapse: 'categoryFP',
        children: [
            {
                title: 'Air & Water Pumps',
                path: '/category',
                queryParams: { category: 4100 },
                ab: '1'
            },
            {
                title: 'Filters',
                path: '/category',
                queryParams: { category: 4200 },
                ab: '2'
            },
            {
                title: 'Filter Media',
                path: '/category',
                queryParams: { category: 4300 },
                ab: '3'
            },
        ]
    },
    {
        path: '/categoryDGS',
        title: 'Decor Gravel & Substrate',
        type: 'sub',
        icon: 'fas fa-leaf',
        collapse: 'categoryDGS',
        children: [
            {
                title: 'Artificial Plants',
                path: '/category',
                queryParams: { category: 5100 },
                ab: '1'
            },
            {
                title: 'Aquarium Substrate',
                path: '/category',
                queryParams: { category: 5200 },
                ab: '2'
            },
            {
                title: 'Backgrounds',
                path: '/category',
                queryParams: { category: 5300 },
                ab: '3'
            },
            {
                title: 'Gravel, Sand & Stones',
                path: '/category',
                queryParams: { category: 5400 },
                ab: '4'
            },
            {
                title: 'Live Plants',
                path: '/category',
                queryParams: { category: 5500 },
                ab: '5'
            },
            {
                title: 'Ornaments',
                path: '/category',
                queryParams: { category: 5600 },
                ab: '6'
            }
        ]
    },
    {
        path: 'categoryHL',
        title: 'Heating & Lighting',
        type: 'sub',
        icon: 'fas fa-thermometer-quarter',
        collapse: 'categoryHL',
        children: [
            {
                title: 'Heaters',
                path: '/category',
                queryParams: { category: 6100 },
                ab: '1'
            },
            {
                title: 'Lights',
                path: '/category',
                queryParams: { category: 6200 },
                ab: '2'
            },
        ]
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

    start: number = 0;
    offset: number = 10;
    catId: number = 36;
    shops: Array<any> = [];

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
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.subscription = this.sidebarService.userItem
            .subscribe((data: any) => {
                if (data.isLogin) {
                    this.isLogin = true;
                }
                this.user = data.user;
            });
    }

    initialize() {

        /* malhar 20180514
        this.deliveryService.getCategories(this.city.id).catch((err): any => {
            this.isLoading = false;
            this.isError = true;
            console.log(err);
        }).subscribe((data: any) => {
            const catArray = data; // JSON.parse(json);
            if (catArray) {
                if (catArray.length > 1) {
                    ROUTES[1].children = [];
                    this.categories = [];
                    catArray.forEach((element: any) => {
                        const child: ChildrenItems = {
                            path: '/items',
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
        */

        /* malhar 2018/10/14
        // shops list start
        this.deliveryService.getShops(this.city.id, this.catId, this.start, this.offset).catch((err): any => {
            this.isLoading = false;
            this.isError = true;
            console.log(err);
        }).subscribe((data: any) => {
            const shopArray = data; // JSON.parse(json);
            if (shopArray) {
                if (shopArray.length > 1) {
                    shopArray.forEach((element: any) => {
                        const child: ChildrenItems = {
                            path: '/shop',
                            queryParams: {
                                shop: element.shopId
                            },
                            title: element.shopName,
                            ab: '-'
                        };
                        ROUTES[1].children.push(child);
                        this.categories.push(element);
                    });

                    this.menuItems = ROUTES.filter(menuItem => menuItem);
                    this.updatePS();
                    console.log(this.menuItems);
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
        // shop list end
        malhar 2018/10/14 */
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
