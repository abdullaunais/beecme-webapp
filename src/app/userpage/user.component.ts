import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';
import { DeliveryService } from "../services/delivery.service";
import { LocationDetails, Message, Address } from "../beans";
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

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
    register: any = {};
    confirmPassword = new FormControl("", [verifyPassword.bind(undefined, this.register)]);

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

        this.initEditProfile();
    }

    initEditProfile() {
        console.log(`edit user properties ${JSON.stringify(this.user)}`);
        if (this.user) { //user already logged in
                  this.register['userId'] = this.user.userId;
                  this.register['username'] = this.user.username;
                  this.register['email'] = this.user.email;
                  this.register['country'] = this.user.country;
                  this.register['address'] = this.user.address;
                  this.register['phone'] = this.user.phone;
                  /*
                  this.provinces = (this.regService.getProvinces(this.sharedService.getUser().country));
                  this.cities = this.regService.getCities(this.sharedService.getUser().country, this.sharedService.getUser().province)
                  this.register['province'] = this.sharedService.getUser().province;
                  this.register['city'] = this.sharedService.getUser().city;
                  this.register['categoryId'] = this.sharedService.getUser().categoryId;
                  */
                }
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

      doRegister() {
          console.log(`doregister fired ${JSON.stringify(this.register)}`)
        /*
        this.register['type'] = this.type;
        this.register['notificationSend'] = (this.register['notificationSend'] ? '1' : '0');
        if (this.sharedService.getUser()) { //user already logged in
    
          this.regService.update(this.register)
            .subscribe(data => {
              this.msg = new Message();
              this.msg = data.json();
              console.log('CUSTOMER UPDATE STATUS ' + data.json())
            },
            err => {
              this.msg = new Message();
              this.msg = err.json();
              console.log('ERROR AT CUSTOMER UPDATE ' + err);
            });
    
    
    
        } else { // new user registration
          this.register['country'] = this.sharedService.getCountry().id;
          this.register['province'] = this.sharedService.getProvince().id;
          this.register['city'] = this.sharedService.getCity().id;
    
          this.regService.register(this.register)
            .subscribe(data => {
              this.msg = new Message();
              this.msg = data.json();
              console.log('REGSITRATION STATUS ' + data.json());
              console.log('REGSITRATION STATUS ' + this.msg);
              this.doLogin();
            },
            err => {
              this.msg = new Message();
              this.msg = err.json();
              console.log('ERROR WHILE REGISTERING ' + err);
            });
        }
        */
      }

    }

    export function verifyPassword(reg: any, ctrl: any) {
        
        const valid = reg.password && reg.password === ctrl.value;
        
        return (valid ? null : 	{ confirmPassword: { 
                                    valid: false}
                                });
    }