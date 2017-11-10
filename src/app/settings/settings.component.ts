import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { DeliveryService } from '../services/delivery.service';
import { Constant } from '../services/constant';

declare var swal: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  breadcrumbArray: { title: string; icon: string; path: string; }[];
  colorTheme: string = 'info';

  currentCountry: any;
  currentProvince: any;
  currentCity: any;

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

  constructor(private storage: ObjectStorage, private deliveryService: DeliveryService) {
    this.currentCountry = this.storage.get(Constant.COUNTRY);
    this.currentProvince = this.storage.get(Constant.PROVINCE);
    this.currentCity = this.storage.get(Constant.CITY);

    this.breadcrumbArray = [
      { title: 'Home', icon: 'home', path: 'home' },
      { title: 'Settings', icon: 'settings', path: 'settings' }
    ];

    this.initialize();
  }

  initialize() {
    this.isLoading = true;
    this.deliveryService.getLocation(this.type, this.value, this.start, this.offset).catch((err): any => {
      console.log('Error ', err);
      this.isError = true;
      this.isLoading = false;
    }).subscribe((data) => {
      const json = JSON.stringify(data);
      this.countryList = JSON.parse(json);
      console.log(this.countryList);
      this.isLoading = false;
      this.isError = false;
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
    const value: number = this.selectedCityId;
    this.selectedCity = this.cityList.find(city => city.id === value);
    this.citySelected = true;

    if (this.countrySelected && this.provinceSelected && this.citySelected) {
      // this.storage.remove(Constant.COUNTRY);
      // this.storage.remove(Constant.PROVINCE);
      // this.storage.remove(Constant.CITY);
      // this.storage.remove(Constant.LOCATION_SET);

      this.storage.set(Constant.COUNTRY, this.selectedCountry);
      this.storage.set(Constant.PROVINCE, this.selectedProvince);
      this.storage.set(Constant.CITY, this.selectedCity);
      this.storage.set(Constant.LOCATION_SET, true);

      this.currentCountry = this.selectedCountry;
      this.currentProvince = this.selectedProvince;
      this.currentCity = this.selectedCity;

      this.selectedCountryId = -1;
      this.selectedProvinceId = -1;
      this.selectedCityId = -1;

      this.selectedCountry = {};
      this.selectedProvince = {};
      this.selectedCity = {};
      
      this.countrySelected = false;
      this.provinceSelected = false;
      this.citySelected = false;

      swal({
        type: 'success',
        title: 'Success!',
        text: 'Location Changed',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
      }).then(() => {
        // ignore
      });
    }
  }

  ngOnInit() {
  }

}
