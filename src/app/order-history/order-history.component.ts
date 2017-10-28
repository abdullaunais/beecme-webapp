import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ObjectStorage } from '../utilities/object-storage';
import { DeliveryService } from '../services/delivery.service';
import { OnClickEvent } from 'angular-star-rating';
import { OnRatingChangeEven } from 'angular-star-rating';
import { OnHoverRatingChangeEvent } from 'angular-star-rating';
import { FormBuilder, Validators } from '@angular/forms';

declare const $: any;
declare const swal: any;

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements AfterViewInit {
    breadcrumbArray: Array<any>;
    @ViewChild('ratingModal') ratingModal: ElementRef;

    authToken: any;

    start: number = 0;
    offset: number = 5;

    orders: Array<any> = [];
    user: any = {};
    isLoading: boolean = false;

    activeOrder: any = null;
    rating: number = 0;
    ratingComment: string = '';
    onClickResult: OnClickEvent;
    onHoverRatingChangeResult: OnHoverRatingChangeEvent;
    onRatingChangeResult: OnRatingChangeEven;

    public feedbackForm = this.formBuilder.group({
        formComment: ['', [Validators.required]]
    });

    constructor(
        private storage: ObjectStorage,
        public formBuilder: FormBuilder,
        private deliveryService: DeliveryService
    ) {
        this.authToken = this.storage.get('user.authToken');
        this.breadcrumbArray = [
            { title: 'Home', icon: 'home', path: 'home' },
            { title: 'Orders', icon: 'assignment_turned_in', path: 'orders' }
        ];
        this.initialize();
    }
    initialize() {
        this.isLoading = true;
        this.user = this.storage.get('user.data');
        this.deliveryService.getOrders(this.user.userId, this.start, this.offset).catch((err): any => {
            this.isLoading = false;
        }).subscribe(orderRes => {
            if (orderRes['cartlist']) {
                if (orderRes['cartlist'].length > 0) {
                    this.orders = orderRes['cartlist'];
                } else {
                    this.orders = [];
                }
            } else {
                this.orders = [];
            }
            this.isLoading = false;
            console.log(` order history ${JSON.stringify(this.orders)}`)
        });
    }

    openRatingModal(order: any) {
        console.log('ACTIVE ORDER: ', order);
        this.activeOrder = order;
        $('#ratingModal').modal('show');
    }

    validateFeedback() {
        this.ratingComment = this.feedbackForm.value.formComment;
        console.log('COMMENT -> ', this.ratingComment);

        const reviewObj = {
            'commentEn': this.ratingComment,
            'commentAr': this.ratingComment,
            'rating': this.rating,
            'userId': this.activeOrder.orderHeader.userId,
            'shopId': this.activeOrder.orderHeader.shopId
        };

        this.deliveryService.sendReview(reviewObj, this.authToken).catch((err): any => {
            swal({
                type: 'error',
                title: 'Error!',
                text: 'Feedback Saving Failed!',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-danger'
            }).then(() => {

            });
        }).subscribe(res => {
            if (res.code === 1) {
                swal({
                    type: 'success',
                    title: 'Success!',
                    text: 'Feedback Saved!',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success'
                }).then(() => {

                });
            } else {
                swal({
                    type: 'error',
                    title: 'Error!',
                    text: 'Feedback Saving Failed!',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-danger'
                }).then(() => {

                });
            }
        });



        this.activeOrder = null;
        $('#ratingModal').modal('hide');
    }

    onClick = ($event: OnClickEvent) => {
        // console.log('onClick $event: ', $event);
        this.onClickResult = $event;
        this.rating = $event.rating;
    }

    onRatingChange = ($event: OnRatingChangeEven) => {
        // console.log('onRatingUpdated $event: ', $event);
        this.onRatingChangeResult = $event;
        this.rating = $event.rating;
    }

    onHoverRatingChange = ($event: OnHoverRatingChangeEvent) => {
        // console.log('onHoverRatingChange $event: ', $event);
        this.onHoverRatingChangeResult = $event;
    }

    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    upperCaseString(str: string) {
        return str.toUpperCase();
    }
}
