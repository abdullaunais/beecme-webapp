import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';
import { LocationDetails, Address, Message, CartReq } from '../beans';
import { DeliveryService } from '../services/delivery.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-shop-list',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [UserService, DeliveryService]
})
export class CartComponent {
    activeCartItem: any;
    breadcrumbArray: Array<any>;
    colorTheme: string = 'brand-primary';

    user: any = {};
    addressList: Address[];
    selectedAddress: Address;
    selectedShopLocation: LocationDetails;
    country: any;
    province: any;
    city: any;

    cartItems: Array<any> = [];

    cartIsEmpty: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;
    shopIsVisible: boolean;
    totalAmount: number = 0;
    isNewAddress: boolean = true;

    public commentForm = this.formBuilder.group({
        formComment: ['', [Validators.required]]
    });

    formCheckout: any = {};
    msg: Message;

    constructor(
        private storage: ObjectStorage,
        private userService: UserService,
        private sharedService: SharedService,
        private deliveryService: DeliveryService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.user = this.storage.get('user.data');
        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');
        this.breadcrumbArray = [
            { title: 'Home', icon: 'home', path: 'home' },
            { title: 'My Cart', icon: 'shopping_cart', path: 'cart' }
        ];
        this.initialize();
    }

    initialize() {
        this.isLoading = true;
        this.isError = false;
        console.log(`selectedCity ${JSON.stringify(this.city)}`);
        this.deliveryService.getLocationDetails(this.city.id).subscribe(data => {
            this.selectedShopLocation = data;
            console.log(`selectedShopLocation ${JSON.stringify(this.selectedShopLocation)}`);
        });

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
            // this.cartShop = this.storage.get('delivery.cartShop');
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
        // this.cartService.setCartCount(this.cartItems.length);
        this.sharedService.removeItem(item);
        this.cartItems = this.sharedService.getCart();

    }

    addressChanged() {
        // this.selectedAddress = this.addressList.find(address => address.id === this.selectedAddressId);
        // console.log(`user selected address for this cart is ${JSON.stringify(address)}`);
        console.log(`user this.selectedAddress for this cart is ${JSON.stringify(this.selectedAddress)}`);
        // this.selectedAddress = address;
    }

    doCheckout() {

        // redirect the user to login first
        // if (!this.sharedService.getUser()) {
        //   this.sharedService.showCart = true;
        //   console.log('this.sharedService.showCart ' + this.sharedService.showCart);
        //   this.router.navigate(['/app-login/1']);
        //   return;
        // }

        // validate the address
        const myCartReq: CartReq = new CartReq();
        myCartReq.orderHeaderReq.comment = 'TO DO COMMENT'; // this.formCheckout['comment'];

        console.log('Selected address details this.newAddress ' + this.formCheckout);
        console.log('Selected address details this.selectedAddress ' + this.selectedAddress);

        if (!this.isNewAddress && (!this.selectedAddress || this.selectedAddress.id < 1)) {
            let err = new Message();
            err.code = -1;
            err.message = 'Delivery address not entered or selected'
            this.msg = err;
        } else if (this.isNewAddress) {
            // new address should be entered
            let newAddress1 = new Address();
            newAddress1.nickName = this.formCheckout['addressNickName'];
            console.log('Selected address details newAddress1.nickName ' + newAddress1.nickName);

            newAddress1.street = this.formCheckout['street'];
            newAddress1.cityId = this.city.id;   // this.sharedService.getCity().id
            newAddress1.provinceId = this.province.id;            // this.sharedService.getProvince().id
            newAddress1.countryId = this.country.id;                             // this.sharedService.getCountry().id
            this.selectedAddress = newAddress1;
            console.log('Selected address details newAddress1 ' + JSON.stringify(newAddress1));
            console.log('Selected address details this.selectedAddress ' + JSON.stringify(this.selectedAddress));

        } else {
            let err = new Message();
            err.code = -1;
            err.message = 'Please check your delivery address and try again'
            this.msg = err;
        }
        console.log('selected address is ' + JSON.stringify(this.selectedAddress));
        console.log('header comment ' + myCartReq.orderHeaderReq.comment);
        myCartReq.dlvAddressReq = this.selectedAddress;
        myCartReq.orderDetailsReq = this.sharedService.getCart();
        // console.log('SAVE CART = ' + (this.sharedService.getUser()));

        // if (this.sharedService.getUser()) {
        myCartReq.orderHeaderReq.userId = this.user.userId; //this.sharedService.getUser().userId;
        myCartReq.orderHeaderReq.shopId = this.sharedService.getShop().shopId;
        myCartReq.orderHeaderReq.currency = this.sharedService.getShop().currency;
        myCartReq.orderHeaderReq.totalAmount = this.sharedService.getCartTotal();

        console.log('MY CART ' + JSON.stringify(myCartReq));

        if (myCartReq.orderHeaderReq.totalAmount < this.sharedService.getShop().minOrderAmount) {

            let err = new Message();
            err.code = -1;
            err.message = `Final total is less than the minimum order amount of ${this.sharedService.getShop().minOrderAmount}`;
            this.msg = err;
            return;
        }

        this.deliveryService.saveCart(myCartReq)
            .subscribe(data => {
                this.handleOrderStatus(data.json());
                /*
              this.msg = new Message();
              this.msg = data.json();
              this.sharedService.resetCart();
              console.log(`CART SAVED SUCCESSFULLY ${data}`);
              */
            },
            err => {
                this.handleOrderStatus(err.json());
                /*
              this.msg = new Message();
              this.msg = err.json();
              console.log(`FAILED TO SAVE CART ${this.msg.message}`);
              */
            });

    }

    openCommentModal(cartItem: any) {
        console.log('ACTIVE ITEM : ', cartItem);
        this.activeCartItem = cartItem;
        $('#commentModal').modal('show');
    }

    validateComment() {
        const comment = this.commentForm.value.formComment;
        console.log('COMMENT -> ', comment);




        this.activeCartItem = null;
        $('#commentModal').modal('hide');
    }

    addressToggle() {
        console.log(`addressToggle ${this.isNewAddress}`);
        this.isNewAddress = !this.isNewAddress;

    }

    handleOrderStatus(json: any) {
        console.log(`handle order status ${json}`);

        if (json && json.code === Message.SUCCESS) { // SUCCESS
            this.sharedService.resetCart();
            swal({
                type: 'success',
                title: 'Order Placement Successful!!',
                text: json.message,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).then(() => {
                this.router.navigateByUrl('/home');
            });
        } else {
            swal({
                type: 'failed',
                title: 'Order Placement Failed!!',
                text: json.message,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-failed'
            }).then(() => {
                this.router.navigateByUrl('/home');
            });
        }

    }
}
