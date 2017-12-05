import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { ObjectStorage } from '../../utilities/object-storage';
import { Router } from '@angular/router';
import { Constant } from '../../services/constant';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-location-cmp',
    templateUrl: './location.component.html',
    providers: [DeliveryService],
    encapsulation: ViewEncapsulation.None
})

export class LocationComponent implements OnInit {
    test: Date = new Date();
    colorTheme: string = 'info';

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
    citySelected: boolean = false;

    isLoading: boolean = false;
    isError: boolean = false;

    type: number = 21;
    value: number = 1;
    start: number = 0;
    offset: number = 20;

    constructor(
        private deliveryService: DeliveryService,
        private storage: ObjectStorage,
        private router: Router,
        private sharedService: SharedService,
    ) { }

    ngOnInit() {

        this.deliveryService.getLocation(this.type, this.value, this.start, this.offset).catch((err): any => {
            console.log('Error ', err);
        }).subscribe((data) => {
            const json = JSON.stringify(data);
            this.countryList = JSON.parse(json);
            this.selectedCountry = JSON.parse(json);
            console.log(this.countryList);
        });
        this.selectedCountryId = 2;
        this.countryChanged();
    }

    countryChanged() {
        this.type = 22;
        const value: number = this.selectedCountryId;
        this.isLoading = true;
        this.deliveryService.getLocation(this.type, value, this.start, this.offset).catch((err): any => {
            console.log('Error ', err);
            this.isError = true;
            this.isLoading = false;
        }).subscribe((data) => {
            const json = JSON.stringify(data);
            this.provinceList = JSON.parse(json);
            console.log(this.provinceList);
            this.isError = false;
            this.isLoading = false;
        });
       // this.selectedCountry = this.countryList.find(country => country.id === this.selectedCountryId);
        this.countrySelected = true;
    }

    provinceChanged() {
        this.type = 24;
        const value: number = this.selectedProvinceId;
        this.isLoading = true;
        this.deliveryService.getLocation(this.type, value, this.start, this.offset).catch((err): any => {
            console.log('Error ', err);
            this.isError = true;
            this.isLoading = false;
        }).subscribe((data) => {
            console.log(`My location data  ${JSON.stringify(data)}`);
            const json = JSON.stringify(data);
            this.cityList = JSON.parse(json);
            console.log(this.cityList);
            this.isError = false;
            this.isLoading = false;
        });
        this.selectedProvince = this.provinceList.find(province => province.id === this.selectedProvinceId);
        this.provinceSelected = true;
    }

    cityChanged() {
        const value: number = this.selectedCityId;
        this.selectedCity = this.cityList.find(city => city.id === value);
        this.citySelected = true;

        this.deliveryService.getShopById(this.selectedCityId, 22).catch((err): any => {
            // this.isLoading = false;
            // this.isAvailable = false;
        }).subscribe((shopData) => {
            console.log(`My shop data  ${JSON.stringify(shopData)}`);
            //this.sharedService.setShop(shopData);      
            this.storage.set(Constant.CART_SHOP, shopData);
        });        
    
    }

    getStarted() {
        console.log(`customers selected city is ${this.selectedCityId}`)
        if (this.selectedCityId > 0) {

            this.storage.set(Constant.COUNTRY, this.selectedCountry);
            this.storage.set(Constant.PROVINCE, this.selectedProvince);
            this.storage.set(Constant.CITY, this.selectedCity);
            this.storage.set(Constant.LOCATION_SET, true);

            this.router.navigate(['/']);
        }
    }
}
