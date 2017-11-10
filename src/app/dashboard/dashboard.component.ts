import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { NotificationsService } from 'angular2-notifications';
import { DashboardCounts } from "../beans";
import { Constant } from '../services/constant';
// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
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

    countsLoading: boolean;

    public options = {
        position: Constant.NOTIFICATION_DEFAULT_POSITION,
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
        this.countsLoading = true;
        this.deliveryService.getDashboardCounts(this.city.id).catch((err): any => {
            console.log('Dashboard Service Error ', err);
            this.countsLoading = false;
        }).subscribe((data) => {
            this.counts = data;
            this.countsLoading = false;
        });
    }

    showNotifications() {
        this.route.queryParams.subscribe(params => {
            if (params['login']) {
                if (params['login'] === 'success') {
                    const toast = this.notify.success('Login Success!', 'Enjoy BeecMe', {
                        timeOut: Constant.NOTIFICATION_DEFAULT_TIMEOUT,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true
                    });
                }
            } else if (params['register']) {
                if (params['register'] === 'success') {
                    const toast = this.notify.success('Registration Success!', 'Enjoy BeecMe', {
                        timeOut: Constant.NOTIFICATION_DEFAULT_TIMEOUT,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true
                    });
                }
            } else if (params['logout']) {
                if (params['logout'] === 'success') {
                    const toast = this.notify.warn('Logged Out!', 'We expect to see you soon.', {
                        timeOut: Constant.NOTIFICATION_DEFAULT_TIMEOUT,
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
