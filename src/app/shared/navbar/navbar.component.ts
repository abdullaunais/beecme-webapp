import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive, OnDestroy, OnChanges } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../services/shared.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ObjectStorage } from '../../utilities/object-storage';
import { DeliveryService } from '../../services/delivery.service';
import { Constant } from '../../services/constant';
import { Variables } from '../../services/variables';

const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    searchInput: string;

    public searchForm = this.fb.group({
        formSearch: ['', [Validators.required]]
    });

    title: string = '';

    cartCount: string;
    subCartSummary: Subscription;

    isLoggedIn: boolean = false;
    user: any = {};

    notifications: Array<any> = [];
    city: any = {};

    @ViewChild('app-navbar-cmp') button: any;

    constructor(
        location: Location,
        private renderer: Renderer,
        private element: ElementRef,
        private sharedService: SharedService,
        private deliveryService: DeliveryService,
        private router: Router,
        public fb: FormBuilder,
        private storage: ObjectStorage
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.city = this.storage.get(Constant.CITY);
        console.log('initializing navbar');

        this.subCartSummary = this.sharedService.getSubjectCartSummary().subscribe((size: any) => { this.cartCount = size; });
        if (this.sharedService.getCart()) {
            // this.cartCount = this.sharedService.getCart().length + ' items';
            this.sharedService.refreshFinalTotal(this.sharedService.getCart());
        } else {
            this.cartCount = '0 items';
        }

        if (this.storage.get(Constant.USER_SET)) {
            this.isLoggedIn = this.storage.get(Constant.USER_SET);
            this.user = this.storage.get(Constant.USER_OBJECT);
            this.deliveryService.getNotifications(this.user.userId).catch((err): any => {
                // ignore
            }).subscribe((res) => {
                console.log('NOTIFICATIONS -> ', res);
                this.notifications = res;
            });
        }

    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if ($('body').hasClass('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if ($('body').hasClass('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        $('#minimizeSidebar').click(function () {
            if (misc.sidebar_mini_active === true) {
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;

            } else {
                setTimeout(function () {
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            const simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
        $('#hideSidebar').click(function () {
            if (misc.hide_sidebar_active === true) {
                setTimeout(function () {
                    $('body').removeClass('hide-sidebar');
                    misc.hide_sidebar_active = false;
                }, 300);
                setTimeout(function () {
                    $('.sidebar').removeClass('animation');
                }, 600);
                $('.sidebar').addClass('animation');

            } else {
                setTimeout(function () {
                    $('body').addClass('hide-sidebar');
                    // $('.sidebar').addClass('animation');
                    misc.hide_sidebar_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            const simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
    }

    ngOnChanges() {
        console.log(`ngOnChanges - count is ${this.cartCount}`);
    }

    isMobileMenu() {
        if ($(window).width() < 991) {
            return false;
        }
        return true;
    };
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    // getTitle() {
    //     const titlee: any = this.location.prepareExternalUrl(this.location.path());
    //     for (let i = 0; i < this.listTitles.length; i++) {
    //         if (this.listTitles[i].type === 'link' && this.listTitles[i].path === titlee) {
    //             return this.listTitles[i].title;
    //         } else if (this.listTitles[i].type === 'sub') {
    //             for (let j = 0; j < this.listTitles[i].children.length; j++) {
    //                 const subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
    //                 if (subtitle === titlee) {
    //                     return this.listTitles[i].children[j].title;
    //                 }
    //             }
    //         }
    //     }

    //     if (titlee.indexOf('/details?') !== -1) {
    //         return 'Details';
    //     }
    //     if (titlee.indexOf('/items?') !== -1) {
    //         return 'Details';
    //     }
    //     return 'BeecMe';
    // }

    getTitle() {
        let variables = Variables.getInstance();
        this.title = variables.getTitle();
        return this.title;
    }

    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

    searchItems() {
        const searchQuery = this.searchForm.value.formSearch;
        console.log(this.searchInput);
        this.router.navigateByUrl(`search?query=${searchQuery}`);
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subCartSummary.unsubscribe();
    }


    cartChanged() {
        console.log('event cart changed fired');
    }
}
