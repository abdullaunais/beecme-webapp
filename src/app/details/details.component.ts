import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DeliveryService } from "../services/delivery.service";
import { ObjectStorage } from '../utilities/object-storage';
import { CartService } from '../cart/cart.service';
import { SharedService } from "../services/shared.service";

declare var swal: any;

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
    item: any = {};
    shop: any = {};

    selectedQty: number = 1;
    city: any;

    constructor(
        private route: ActivatedRoute,
        private storage: ObjectStorage,
        private deliveryService: DeliveryService,
        private cartService: CartService,
        private sharedService: SharedService
    ) { }

    ngOnInit() {
        this.city = this.storage.get('location.city');
        this.route.queryParams.subscribe(params => {
            if (this.sharedService.getShop()) {
                //this.shop['shopId'] = params.shop;
                this.deliveryService.getShopById(this.city.id, this.sharedService.getShop().shopId).catch((err): any => {
                    // this.isLoading = false;
                    // this.isAvailable = false;
                  }).subscribe((shopData) => {
                    this.shop = shopData;
                  });                
                // this.deliveryService.getShopById(this.shop['shopId']).catch((err): any => {

                // }).subscribe((shop: any) => {
                //     this.shop = shop;
                // });
            }

            if (params['item']) {
                this.item['itemCode'] = params.item;
            }
            this.initialize();
        });
    }

    // validateCart() {
    //     const cartShop = this.storage.get('delivery.cartShop');
    //     if (cartShop) {
    //         if (cartShop.shopId) {
    //             if (parseInt(cartShop.shopId, 10) !== parseInt(this.shop.shopId, 10)) {
    //                 swal({
    //                     type: 'warning',
    //                     title: 'Existing Cart',
    //                     text: 'Your cart already contains items from a different Shop. You can only  add items from one shop at a time. Do you wish to clear the existing cart and add this item?',
    //                     showCancelButton: true,
    //                     confirmButtonColor: '#00b55d',
    //                     cancelButtonColor: '#d33',
    //                     confirmButtonText: 'Clear Cart'
    //                 }).then(() => {
    //                     this.storage.remove('delivery.cart');
    //                     this.storage.remove('delivery.cartShop');
    //                     this.cartService.setCartCount(0);

    //                     this.addToCart();
    //                 }).catch(() => {
    //                     return;
    //                 });
    //             } else {
    //                 this.addToCart();
    //             }
    //         } else {
    //             this.addToCart();
    //         }
    //     } else {
    //         this.addToCart();
    //     }
    // }

    addToCart() {

        this.item.quantity = this.selectedQty;
        if (!this.sharedService.pushItem(this.item)) {
            // Customer is trying to add items from different shops
            swal({
                type: 'warning',
                title: 'Existing Cart',
                text: 'Your cart already contains items from a different Shop. You can only  add items from one shop at a time. Do you wish to clear the existing cart and add this item?',
                showCancelButton: true,
                confirmButtonColor: '#00b55d',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Clear Cart'
            }).then(() => {
                //this.storage.remove('delivery.cart');
                //this.storage.remove('delivery.cartShop');
                //this.cartService.setCartCount(0);
                this.sharedService.resetCart();
                this.addToCart();
            }).catch(() => {
                return;
            });

        }
    }

    // addToCart() {
    //     this.item.quantity = this.selectedQty;
    //     let cart: Array<any> = this.storage.get('delivery.cart');
    //     if (!cart) {
    //         cart = [];
    //     }
    //     const cartItems: Array<any> = cart;
    //     const prevCart = cartItems.filter(x => x.itemCode === this.item.itemCode);
    //     if (prevCart && prevCart.length > 0) {
    //         const index = cartItems.findIndex(x => x.itemCode === this.item.itemCode);
    //         cartItems[index] = this.item;
    //         this.storage.set('delivery.cart', cartItems);
    //         this.cartService.setCartCount(cartItems.length);
    //         this.storage.set('delivery.cartShop', this.shop);
    //     } else {
    //         cartItems.push(this.item);
    //         this.storage.set('delivery.cart', cartItems);
    //         this.storage.set('delivery.cartShop', this.shop);
    //     }
    // }

    updateQty(val: number) {
        console.log(`updateQty current value = ${this.item.qty} and selectedQty ${this.selectedQty} item.quantity is ${this.item.quantity}`);
        if (this.selectedQty > 0 && val < 0 ) {
            this.selectedQty += val;
        }
        if (this.selectedQty >= 0  && val > 0 ) {
            this.selectedQty += val;
        }

    }

    initialize() {
        console.log(`item details initialize fired with shopId ${this.shop['shopId']} and itemCode ${this.item['itemCode']}`);
       // this.deliveryService.getItemById(this.shop['shopId'], this.item['itemCode']).catch((err): any => {
        this.deliveryService.getItemById(this.sharedService.getShop().shopId, this.item['itemCode']).catch((err): any => {
            // ignore
        }).subscribe(item => {
            this.item = item;
            // this.deliveryService
        });
    }
}
