import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DeliveryService } from "../services/delivery.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    providers: [DeliveryService]
})
export class DetailsComponent {
    item: any = {};
    shop: any;

    constructor(
        private route: ActivatedRoute,
        private deliveryService: DeliveryService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['shopid']) {
                let shopId = params.id;
                let shopStr = localStorage.getItem('shop');
                if (shopStr) {
                    let shopObj = JSON.parse(shopStr);
                } else {
                    // this.deliveryService.getShopById()
                }
            }

            if (params['itemid']) {
                this.item['itemCode'] = params.id;
            }
            this.initialize();
        });
    }

    initialize() {
        this.deliveryService.getItemById(this.item['itemCode']).catch((err):any => {

        }).subscribe(item => {
            this.item = item;
            // this.deliveryService
        });
    }
}
