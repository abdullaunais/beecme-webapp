import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    // constructor(private navbarTitleService: NavbarTitleService) { }

    constructor(private router: Router) {}

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
