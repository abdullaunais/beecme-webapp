import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    // providers: [BreadcrumbService]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    breadcrumbArray: { title: string; icon: string; path: string; }[];
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    // constructor(private navbarTitleService: NavbarTitleService) { }

    constructor(
        private router: Router,
        // private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbArray = [{title: 'Home', icon: 'home', path: 'home'}]
        // this.breadcrumbService.changeRoute([]);
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
