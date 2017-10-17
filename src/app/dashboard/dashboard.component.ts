import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { NotificationsService } from 'angular2-notifications';
import { DashboardCounts } from "../beans";
// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
    counts: DashboardCounts = {
        countCategory: 0,
        countShops: 0,
        countItems: 0
    };
    country: any = {};
    province: any = {};
    city: any = {};
    breadcrumbArray: { title: string; icon: string; path: string; }[];

    public options = {
        position: ['bottom', 'right'],
        timeOut: 0,
        lastOnBottom: true,
    };
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    // constructor(private navbarTitleService: NavbarTitleService) { }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private deliveryService: DeliveryService,
        private storage: ObjectStorage,
        private notify: NotificationsService
    ) {
        this.breadcrumbArray = [{ title: 'Home', icon: 'home', path: 'home' }];
        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');
        this.initialize();
    }

    initialize() {
        this.deliveryService.getDashboardCounts(this.city.id).catch((err): any => {
            console.log('Dashboard Service Error ', err);
        }).subscribe((data) => {
            this.counts = data;
        });
    }

    showNotifications() {
        this.route.queryParams.subscribe(params => {
            if (params['login']) {
                if (params['login'] === 'success') {
                    const toast = this.notify.success('Login Success!', 'Enjoy BeecMe', {
                        timeOut: 6000,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true
                    });
                }
            } else if (params['register']) {
                if (params['register'] === 'success') {
                    const toast = this.notify.success('Registration Success!', 'Enjoy BeecMe', {
                        timeOut: 6000,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true
                    });
                }
            } else if (params['logout']) {
                if (params['logout'] === 'success') {
                    const toast = this.notify.warn('Logged Out!', 'We expect to see you soon.', {
                        timeOut: 6000,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true
                    });
                }
            }

        });
    }

    public ngOnInit() {
    }
    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
        this.showNotifications();
    }

    routeToPath(path: string) {
        this.router.navigate([path]);
    }
}
