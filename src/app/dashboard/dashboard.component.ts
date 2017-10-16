import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
    counts: any = {};
    country: any = {};
    province: any = {};
    city: any = {};
    breadcrumbArray: { title: string; icon: string; path: string; }[];
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    // constructor(private navbarTitleService: NavbarTitleService) { }

    constructor(
        private router: Router,
        private deliveryService: DeliveryService,
        private storage: ObjectStorage
    ) {
        this.breadcrumbArray = [{title: 'Home', icon: 'home', path: 'home'}];
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

    public ngOnInit() {
    }
    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    routeToPath(path: string) {
        this.router.navigate([path]);
    }
}
