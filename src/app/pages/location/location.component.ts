import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../../services/delivery.service";
import { ObjectStorage } from '../../utilities/object-storage';

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

    selectedCountryId: number = -1;
    selectedProvinceId: number = -1;
    selectedCityId: number = -1;

    selectedCountry: any = {};
    selectedProvince: any = {};
    selectedCity: any = {};

    countrySelected: boolean = false;
    provinceSelected: boolean = false;
    // citySelected: boolean = false;

    type: number = 21;
    value: number = 1;
    start: number = 0;
    offset: number = 20;

    constructor(private deliveryService: DeliveryService, private storage: ObjectStorage) {}

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

    countryChanged() {
        this.type = 22;
        let value: number = this.selectedCountryId;
        this.deliveryService.getLocation(this.type, value, this.start, this.offset).catch((err): any => {
            console.log("Error ", err);
        }).subscribe((data) => {
            let json = JSON.stringify(data);
            this.provinceList = JSON.parse(json);
            console.log(this.provinceList);
        });
        this.selectedCountry = this.countryList.find(country => country.id == this.selectedCountryId);
        this.countrySelected = true;
    }

    provinceChanged() {
        this.type = 24;
        let value: number = this.selectedProvinceId;
        this.deliveryService.getLocation(this.type, value, this.start, this.offset).catch((err): any => {
            console.log("Error ", err);
        }).subscribe((data) => {
            let json = JSON.stringify(data);
            this.cityList = JSON.parse(json);
            console.log(this.cityList);
        });
        this.selectedProvince = this.provinceList.find(province => province.id == this.selectedProvinceId);
        this.provinceSelected = true;
    }

    cityChanged() {
        let value: number = this.selectedCityId;
        this.selectedCity = this.cityList.find(city => city.id == value);

        if(this.countrySelected && this.provinceSelected) {
            this.storage.set('location.country', this.selectedCountry);
            this.storage.set('location.province', this.selectedProvince);
            this.storage.set('location.city', this.selectedCity);
            this.storage.set('location.set', true);

        }

    }
}
