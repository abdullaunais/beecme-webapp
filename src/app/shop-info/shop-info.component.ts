import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss']
})
export class ShopInfoComponent implements OnInit {
  @Input('shop') shop: any;
  constructor() { }

  ngOnInit() {
  }

}
