import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, AfterViewInit {
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {
    }
    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
