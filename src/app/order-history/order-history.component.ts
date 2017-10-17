import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { DeliveryService } from '../services/delivery.service';

declare const $: any;

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements AfterViewInit {
    start: number = 0;
    offset: number = 5;

    orders: Array<any> = [];
    user: any = {};
    isLoading: boolean = false;
    constructor(
        private storage: ObjectStorage,
        private deliveryService: DeliveryService
    ) {
        this.initialize();
    }
    initialize() {
        this.isLoading = true;
        this.user = this.storage.get('user.data');
        this.deliveryService.getOrders(this.user.userId, this.start, this.offset).catch((err): any => {
            this.isLoading = false;
        }).subscribe(orderRes => {
            if (orderRes['cartlist']) {
                if (orderRes['cartlist'].length > 0) {
                    this.orders = orderRes['cartlist'];
                } else {
                    this.orders = [];
                }
            } else {
                this.orders = [];
            }
            this.isLoading = false;
        });

    }
    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    upperCaseString(str: string) {
        return str.toUpperCase();
    }
}
