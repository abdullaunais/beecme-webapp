import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../../services/delivery.service";

declare var $: any;

@Component({
    selector: 'app-location-cmp',
    templateUrl: './location.component.html',
    providers: [DeliveryService]
})

export class LocationComponent implements OnInit {
    test: Date = new Date();

    countryList: Array<any> = [];
    provinceList: Array<any> = [];
    cityList: Array<any> = [];

    selectedCountry: any = {};
    selectedProvince: any = {};
    selectedCity: any = {};

    type: number = 21;
    value: number = 1;
    start: number = 0;
    offset: number = 20;

    constructor(private deliveryService: DeliveryService) {

    }

    checkFullPageBackgroundImage() {
        const $page = $('.full-page');
        const image_src = $page.data('image');

        if (image_src !== undefined) {
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ngOnInit() {
        this.checkFullPageBackgroundImage();
        this.deliveryService.getLocation(this.type, this.value, this.start, this.offset).catch((err): any => {
            console.log("Error ", err);
        }).subscribe((data) => {
            let json = JSON.stringify(data);
            this.countryList = JSON.parse(json);
            console.log(this.countryList);
        });
    }

    countrySelected() {
        this.type = 22;
        this.value = this.selectedCountry.id;
        this.deliveryService.getLocation(this.type, this.value, this.start, this.offset).catch((err): any => {
            console.log("Error ", err);
        }).subscribe((data) => {
            let json = JSON.stringify(data);
            this.provinceList = JSON.parse(json);
            console.log(this.provinceList);
        });
    }

    provinceSelected() {
        this.type = 24;
        this.value = this.selectedProvince.id;
        this.deliveryService.getLocation(this.type, this.value, this.start, this.offset).catch((err): any => {
            console.log("Error ", err);
        }).subscribe((data) => {
            let json = JSON.stringify(data);
            this.cityList = JSON.parse(json);
            console.log(this.cityList);
        });
    }

    citySelected() {

    }
}
