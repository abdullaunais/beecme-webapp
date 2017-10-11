import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DeliveryService } from "../services/delivery.service";
import { ObjectStorage } from '../utilities/object-storage';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [DeliveryService, CartService]
})
export class DetailsComponent {
    item: any = {};
    shop: any = {};

    selectedQty: number = 1;

    constructor(
        private route: ActivatedRoute,
        private storage: ObjectStorage,
        private deliveryService: DeliveryService,
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['shop']) {
                this.shop['shopId'] = params.shop;
                // let shopStr = localStorage.getItem('shop');
                // if (shopStr) {
                //     let shopObj = JSON.parse(shopStr);
                // } else {
                //     // this.deliveryService.getShopById()
                // }
                this.deliveryService.getShopById(this.shop['shopId']).catch((err): any => {

                }).subscribe((shop: any) => {
                    this.shop = shop;
                });
            }

            if (params['item']) {
                this.item['itemCode'] = params.item;
            }
            this.initialize();
        });
    }

    validateCart() {
        let cartShop = this.storage.get('delivery.cartShop');
        if (cartShop) {
            if (cartShop.userId) {
                if (parseInt(cartShop.shopId) !== parseInt(this.shop.shopId)) {
                    // let cartAlert = this.alertCtrl.create({
                    //   title: 'Existing Cart',
                    //   cssClass: 'alert-style',
                    //   message: 'Your cart already contains items from a different Shop. You can only  add items from one shop at a time. Do you wish to clear the existing cart and add this item?',
                    //   buttons: [
                    //     {
                    //       text: 'Cancel',
                    //       cssClass: 'alert-button-danger-plain',
                    //       role: 'cancel',
                    //       handler: () => {
                    //         return;
                    //       }
                    //     },
                    //     {
                    //       text: 'Clear Cart',
                    //       cssClass: 'alert-button-primary',
                    //       handler: () => {
                    //         this.storage.set("delivery.cart", []).then(res => {
                    //           this.storage.set("delivery.cartCount", 0).then(res => {
                    //             this.storage.set("delivery.cartShop", {}).then(res => {
                    //               this.variables.setCartCount(0);
                    //               this.selectQuantity();
                    //             });
                    //           });
                    //         });
                    //       }
                    //     }
                    //   ]
                    // });
                    // cartAlert.present();
                } else {
                    this.addToCart();
                }
            } else {
                this.addToCart();
            }
        } else {
            this.addToCart();
        }
    }

    addToCart() {
        this.item.quantity = this.selectedQty;
        let cart: Array<any> = this.storage.get('delivery.cart');
        if (!cart) {
            cart = []
        }
        let cartItems: Array<any> = cart;
        let prevCart = cartItems.filter(x => x.itemCode == this.item.itemCode);
        if (prevCart && prevCart.length > 0) {
            let index = cartItems.findIndex(x => x.itemCode == this.item.itemCode);
            cartItems[index] = this.item
            this.storage.set("delivery.cart", cartItems);
            this.cartService.setCount(cartItems.length);
            // this.storage.set("delivery.cartCount", cartItems.length);
            this.storage.set("delivery.cartShop", this.shop);
            // this.variables.setCartCount(cartItems.length);
        } else {
            cartItems.push(this.item);
            this.storage.set('delivery.cart', cartItems);
            // this.storage.set('delivery.cartCount', cartItems.length);
            this.storage.set("delivery.cartShop", this.shop);
            // this.variables.setCartCount(cartItems.length);
        }
    }

    updateQty(val: number) {
        if (val < this.item.qty) {
            this.selectedQty += val;
        }
    }

    initialize() {
        this.deliveryService.getItemById(this.shop['shopId'], this.item['itemCode']).catch((err): any => {

        }).subscribe(item => {
            this.item = item;
            // this.deliveryService
        });
    }
}
