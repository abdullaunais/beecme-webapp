import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';
import { DeliveryService } from "../services/delivery.service";
import { LocationDetails, Message, Address } from "../beans";

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html',
    providers: [UserService, DeliveryService]
})

export class UserComponent {
    msg: Message;
    user: any = {};
    //addressList: Array<any> = [];
    selectedShopLocation: LocationDetails;
    country: any;
    province: any;
    city: any;

    //nickname: string;
    //street: string;
    dlvAddress: any = {};
    addresses: Address[];

    isLoading: boolean = false;
    isError: boolean = false;

    constructor(
        private storage: ObjectStorage,
        private userService: UserService,
        private deliveryService: DeliveryService,
    ) {
        this.user = this.storage.get('user.data');

        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');

        this.initialize();
    }

    initialize() {
        this.isLoading = true;
        this.isError = false;
        this.deliveryService.getLocationDetails(this.city.id)
        .subscribe(data => { 
            this.selectedShopLocation = data;
        }) ;        
        this.userService.getAddressList(this.user.userId, this.user.authToken).catch((err):any => {
            this.isLoading = false;
            this.isError = true;
        }).subscribe(data => {
            this.addresses = data
            console.log(`users current address list ${JSON.stringify(this.addresses)}`)
            // this.locationLabel = this.city.nameEn + ", \n" + this.province.nameEn + ",\n" + this.country.nameEn + ".";
            this.isLoading = false;
        });
    }

    inputBlur() {
        return;
    }

    addAddress() {
        let address: Address  = new Address();
        console.log(`adding new address ${this.dlvAddress}`);
        address.nickName = this.dlvAddress['nickName'];
        address.street = this.dlvAddress['street'];
    
        address.cityId = this.selectedShopLocation.cityId; 
        address.provinceId = this.selectedShopLocation.provinceId;
        address.countryId = this.selectedShopLocation.countryId;
        address.userId = this.user.userId;
    
        console.log(JSON.stringify(address))
        this.userService.addAddress(address)
        .subscribe(data => {
          this.msg = new Message();
                   this.msg = data.json();
                    console.log('ADD NEW ADDRESS STATUS '+ data.json())},
                     err => {
                   this.msg = new Message();
                   this.msg = err;
                    console.log('ERROR ADDING NEW ADDRESS ' + err);
                  });
        // this.router.navigate(['/dlvaddress']);
      }

      loadAddressses() {
        console.log(`LOADING DELIVERY ADDRESSES FOR USER ${JSON.stringify(this.user)}`);
        this.userService.getAddresses(this.user.userId)
          .subscribe(
          (data) => {
            console.log(`Retrieved addresses ${JSON.stringify(data)}`);
            this.addresses = data;
          }
          );
      }
    }
