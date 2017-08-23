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

    constructor(
        private route: ActivatedRoute,
        private deliveryService: DeliveryService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.item['itemCode'] = params.id;
                console.log(this.item['itemCode']);
                this.initialize();
            }
        });
    }

    initialize() {

    }
}
