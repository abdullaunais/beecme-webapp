import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';
import { CartService } from './cart.service';
import { SharedService } from "../services/shared.service";
import { LocationDetails, Address } from "../beans";
import { DeliveryService } from "../services/delivery.service";
import { Observable } from 'rxjs/Rx';


@Component({
    selector: 'app-shop-list',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [UserService, CartService, DeliveryService]
})
export class CartComponent {
    colorTheme: string = 'info';

    user: any = {};
    addressList: Address[];
    selectedAddress: Address;
    selectedAddressId: number = -1;
    selectedShopLocation: LocationDetails;
    country: any;
    province: any;
    city: any;

    cartItems: Array<any> = [];
    cartShop: any = {};

    cartIsEmpty: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;
    shopIsVisible: boolean;
    totalAmount: number = 0;
    isNewAddress: boolean = false;

    constructor(
        private storage: ObjectStorage,
        private userService: UserService,
        private cartService: CartService,
        private sharedService: SharedService,
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
        console.log(`selectedCity ${JSON.stringify(this.city)}`);
        this.deliveryService.getLocationDetails(this.city.id)
        .subscribe(data => { 
            this.selectedShopLocation = data;
        }) ;
        console.log(`selectedShopLocation ${JSON.stringify(this.selectedShopLocation)}`);
        // .catch((err): any => {
        //     this.isLoading = false;
        //     this.isError = true;
        // }).subscribe(data => {
        //     this.selectedShopLocation = data;
        //     // this.locationLabel = this.city.nameEn + ", \n" + this.province.nameEn + ",\n" + this.country.nameEn + ".";
        //     this.isLoading = false;
        // });

        this.userService.getAddressList(this.user.userId, this.user.authToken).catch((err): any => {
            this.isLoading = false;
            this.isError = true;
        }).subscribe((data: Array<any>) => {
            this.addressList = data;
            // this.locationLabel = this.city.nameEn + ", \n" + this.province.nameEn + ",\n" + this.country.nameEn + ".";
            this.isLoading = false;
        });

        // const cart = this.storage.get('delivery.cart');
        this.cartItems = this.sharedService.getCart();
        console.log(this.cartItems);
        console.log(`Final Total is ${this.sharedService.getCartTotal()}`);
        if (this.cartItems && this.cartItems.length > 0) {
            // if (cart.length > 0) {
                //this.cartShop = this.storage.get('delivery.cartShop');
                // this.cartShop = cartShop;
                this.shopIsVisible = true;
                this.cartIsEmpty = false;
                
                // this.cartItems = [];
                // cart.forEach((item: any) => {
                //     this.totalAmount = this.totalAmount + (item.price * item.quantity);
                //         this.cartItems.push(item);
                // });
            // } else {
            //     this.cartItems = [];
            //     this.cartIsEmpty = true;
            // }
        } else {
           // this.cartItems = [];
            this.cartIsEmpty = true;
        }
        this.isLoading = false;
        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');
        console.log(`users city is ${JSON.stringify(this.city)} province ${JSON.stringify(this.province)}`)
    }

    removeItem(item: any, index: number) {
        //   this.cartItems.splice(this.cartItems.findIndex((elem) => elem.itemCode === item.itemCode), 1);
        //   this.totalAmount = 0;
        //   this.cartItems.forEach((item) => {
        //     this.totalAmount = this.totalAmount + (item.price * item.quantity);
        //   });
        //   this.storage.set('delivery.cart', this.cartItems);
        //   if (this.cartItems.length === 0) {
        //     this.storage.set('delivery.cartShop', {});
        //     this.shopIsVisible = false;
        //     this.cartIsEmpty = true;
        //   }
          //this.cartService.setCartCount(this.cartItems.length);
          this.sharedService.removeItem(item);
          this.cartItems = this.sharedService.getCart();

      }

    addressChanged() {
        //this.selectedAddress = this.addressList.find(address => address.id === this.selectedAddressId);
        //console.log(`user selected address for this cart is ${JSON.stringify(address)}`);
        console.log(`user this.selectedAddress for this cart is ${JSON.stringify(this.selectedAddress)}`);
        //this.selectedAddress = address;
    }
}
