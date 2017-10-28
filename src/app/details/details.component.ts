import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { ObjectStorage } from '../utilities/object-storage';
import { SharedService } from '../services/shared.service';
import { NotificationsService } from 'angular2-notifications';
import { Constant } from '../services/constant';

declare var swal: any;

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailsComponent {
    breadcrumbArray: Array<any>;
    item: any = {};
    shop: any = {};

    selectedQty: number = 1;
    city: any;

    activeImage: string;
    activeImageId: number = 1;

    public options = {
        position: Constant.NOTIFICATION_DEFAULT_POSITION,
        timeOut: 0,
        lastOnBottom: true,
    };

    constructor(
        private route: ActivatedRoute,
        private storage: ObjectStorage,
        private deliveryService: DeliveryService,
        private sharedService: SharedService,
        private notify: NotificationsService,
        private router: Router
    ) {
        this.initialize();
    }

    initialize() {
        this.city = this.storage.get('location.city');
        this.route.queryParams.subscribe(params => {
            this.shop['shopId'] = params['shop'];
            this.item['itemCode'] = params['item'];

            this.deliveryService.getItemById(params['shop'], this.item['itemCode']).catch((err): any => {
                // ignore
            }).subscribe(item => {
                this.item = item;
                if (item.img1) {
                    this.activeImage = item.img1;
                }
                // this.deliveryService
            });

            this.deliveryService.getShopById(this.city.id, params['shop']).catch((err): any => {
                // this.isLoading = false;
                // this.isAvailable = false;
            }).subscribe((shopData) => {
                this.shop = shopData;
                console.log(`item details initialize fired with shopId ${this.shop['shopId']} and itemCode ${this.item['itemCode']}`);
            });

            if (params['item'] && params['shop'] && params['item']) {
                this.breadcrumbArray = [
                    { title: 'Home', icon: 'home', path: 'home' },
                    { title: 'Categories', icon: 'apps', path: 'categories' },
                    { title: 'Shops', icon: 'store', path: 'category', queryParams: { category: params['category'] } },
                    { title: 'Items', icon: 'bookmark', path: 'shop', queryParams: { category: params['category'], shop: params['shop'] } },
                    { title: 'Details', icon: 'info', path: 'details', queryParams: { category: params['category'], shop: params['shop'], item: params['item'] } }
                ];
            }
        });
    }

    setImage(img: string, id: number) {
        this.activeImage = img;
        this.activeImageId = id;
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
        } else {
            const toast = this.notify.success('Item Added!', 'Click to Checkout', {
                timeOut: Constant.NOTIFICATION_DEFAULT_TIMEOUT,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true
            });
            toast.click.subscribe((event: any) => {
                this.router.navigate(['/cart']);
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

        if (this.item.qty > this.selectedQty) {
            if (this.selectedQty >= 0 && val > 0) {
                this.selectedQty += val;
            }
        }

        if (this.selectedQty > 1 && val < 0) {
            this.selectedQty += val;
        }

    }
}
