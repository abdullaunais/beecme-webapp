import { Component } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html',
    providers: [UserService]
})

export class UserComponent {
    user: any = {};
    addressList: Array<any> = [];

    country: any;
    province: any;
    city: any;

    nickname: string;
    street: string;

    isLoading: boolean = false;
    isError: boolean = false;

    constructor(
        private storage: ObjectStorage,
        private userService: UserService
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
        this.userService.getAddressList(this.user.userId, this.user.authToken).catch((err):any => {
            this.isLoading = false;
            this.isError = true;
        }).subscribe(data => {
            this.addressList = data
            // this.locationLabel = this.city.nameEn + ", \n" + this.province.nameEn + ",\n" + this.country.nameEn + ".";
            this.isLoading = false;
        });
    }

    inputBlur() {
        return;
    }
}
