import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { ObjectStorage } from '../../utilities/object-storage';
import { Router } from '@angular/router';

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
    ) { }

    ngOnInit() {
        this.deliveryService.getLocation(this.type, this.value, this.start, this.offset).catch((err): any => {
            console.log('Error ', err);
        }).subscribe((data) => {
            let json = JSON.stringify(data);
            this.countryList = JSON.parse(json);
            console.log(this.countryList);
        });
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
        this.selectedCountry = this.countryList.find(country => country.id === this.selectedCountryId);
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
        let value: number = this.selectedCityId;
        this.selectedCity = this.cityList.find(city => city.id === value);
        this.citySelected = true;
    }

    getStarted() {
        if (this.countrySelected && this.provinceSelected && this.citySelected) {
            this.storage.set('location.country', this.selectedCountry);
            this.storage.set('location.province', this.selectedProvince);
            this.storage.set('location.city', this.selectedCity);
            this.storage.set('location.set', true);

            this.router.navigate(['/']);
        }
    }
}
