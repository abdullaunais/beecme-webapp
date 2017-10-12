import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';
import { CartService } from './cart.service';

@Component({
    selector: 'app-shop-list',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [UserService, CartService]
})
export class CartComponent {
    colorTheme: string = 'info';

    user: any = {};
    addressList: Array<any> = [];
    selectedAddress: any = {};
    selectedAddressId: number = -1;

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
        private cartService: CartService
    ) {
        this.user = this.storage.get('user.data');
        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');
    }

    ngOnInit() {
        this.isLoading = true;
        this.isError = false;
        this.userService.getAddressList(this.user.userId, this.user.authToken).catch((err): any => {
            this.isLoading = false;
            this.isError = true;
        }).subscribe((data: Array<any>) => {
            this.addressList = data;
            // this.locationLabel = this.city.nameEn + ", \n" + this.province.nameEn + ",\n" + this.country.nameEn + ".";
            this.isLoading = false;
        });

        const cart = this.storage.get('delivery.cart');
        console.log(cart);
        if (cart) {
            if (cart.length > 0) {
                const cartShop = this.storage.get('delivery.cartShop');
                this.cartShop = cartShop;
                this.shopIsVisible = true;
                this.cartIsEmpty = false;
                this.cartItems = [];
                let timeout = 0;
                cart.forEach((item: any) => {
                    this.totalAmount = this.totalAmount + (item.price * item.quantity);
                    setTimeout(() => {
                        this.cartItems.push(item);
                    }, timeout += 100);
                });
            } else {
                this.cartItems = [];
                this.cartIsEmpty = true;
            }
        } else {
            this.cartItems = [];
            this.cartIsEmpty = true;
        }
        this.isLoading = false;
        this.city = this.storage.get('location.city');
    }

    removeItem(item: any, index: number) {
        setTimeout(() => {
          this.cartItems.splice(this.cartItems.findIndex((elem) => elem.itemCode === item.itemCode), 1);
          this.totalAmount = 0;
          this.cartItems.forEach((item) => {
            this.totalAmount = this.totalAmount + (item.price * item.quantity);
          });
          this.storage.set('delivery.cart', this.cartItems);
          if (this.cartItems.length === 0) {
            this.storage.set('delivery.cartShop', {});
            this.shopIsVisible = false;
            this.cartIsEmpty = true;
          }
          this.cartService.setCartCount(this.cartItems.length);
        }, 350);
      }

    addressChanged() {
        this.selectedAddress = this.addressList.find(address => address.id === this.selectedAddressId)
    }
}
