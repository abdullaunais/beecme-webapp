import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DeliveryService } from "../services/delivery.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [DeliveryService]
})
export class DetailsComponent {
    item: any = {};
    shop: any = {};

    selectedQty: number = 1;

    constructor(
        private route: ActivatedRoute,
        private deliveryService: DeliveryService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['shop_id']) {
                this.shop['shopId'] = params.shop_id;
                // let shopStr = localStorage.getItem('shop');
                // if (shopStr) {
                //     let shopObj = JSON.parse(shopStr);
                // } else {
                //     // this.deliveryService.getShopById()
                // }
            }

            if (params['item_id']) {
                this.item['itemCode'] = params.item_id;
            }
            this.initialize();
        });
    }

    updateQty(val: number) {
        this.selectedQty += val;
    }

    initialize() {
        this.deliveryService.getItemById(this.item['itemCode'], this.shop['shopId']).catch((err):any => {

        }).subscribe(item => {
            this.item = item;
            // this.deliveryService
        });
    }
}
