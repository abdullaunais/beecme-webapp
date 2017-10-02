import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-shop-list',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [UserService]
})
export class CartComponent {
    colorTheme: string = 'info';
    cartList: Array<any> = [1, 2, 3];

    user: any = {};
    addressList: Array<any> = [];
    selectedAddress: any = {};
    selectedAddressId: number = -1;

    country: any;
    province: any;
    city: any;

    isLoading: boolean = false;
    isError: boolean = false;
    isNewAddress: boolean = false;

    constructor(
        private storage: ObjectStorage,
        private userService: UserService
    ) {
        this.user = this.storage.get('user.data');

        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');
    }

    ngOnInit() {
        this.initialize();
    }

    initialize() {
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
    }

    addressChanged() {
        this.selectedAddress = this.addressList.find(address => address.id === this.selectedAddressId)
    }
}
