import { Component } from '@angular/core';

@Component({
    selector: 'app-shop-list',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cartList : Array<any> = [1,2,3];

    isNewAddress: boolean = false;
    constructor() {}

    toggleNewAddress() {
        if(this.isNewAddress) {
            document.getElementById('new-address-heading').style.color = "#171B95";
        } else {
            document.getElementById('new-address-heading').style.color = "#999";
        }
    }
}
