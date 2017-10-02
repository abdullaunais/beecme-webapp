import { Component } from '@angular/core';
import { DeliveryService } from "../services/delivery.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [DeliveryService]
})
export class ItemListComponent {

  start: number = 0;
  offset: number = 20;

  cartCount: number;
  isLoading: boolean;
  isAvailable: boolean;
  noMoreItems: boolean;

  shop: any = {};

  items: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
  ) {
    this.isLoading = true;
    this.isAvailable = true;
    this.noMoreItems = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.shop['shopId'] = params.id;
        this.initialize();
      }
    });
  }

  initialize() {
    let shopId = this.shop['shopId'];
    this.deliveryService.getItemByShop(shopId, this.start, this.offset).catch((err): any => {
      this.isLoading = false;
      this.isAvailable = false;
    }).subscribe((data) => {
      if (data['itemlist']) {
        if (data['itemlist'].length > 0) {
          this.isAvailable = true;
          let timeout = 0;
          data['itemlist'].forEach((item: any) => {
            setTimeout(() => {
              this.items.push(item);
            }, timeout += 100);
          });
        } else {
          this.items = [];
          this.isAvailable = false;
        }
      } else {
        this.items = [];
        this.isAvailable = false;
      }
      this.isLoading = false;
    });
  }
}
