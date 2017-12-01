import { Component, Input, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopInfoComponent {
  @Input('shop') shop: any;
  constructor() { }

  openShopModal() {
    $('#shopModal').modal('show');
  }
}
