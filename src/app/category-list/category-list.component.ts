import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../services/delivery.service";
import { ObservableInput } from 'rxjs/Observable';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [DeliveryService]
})
export class CategoryListComponent implements OnInit {
  isLoading: boolean;
  isAvailable: boolean;
  isError: boolean;

  categories: Array<any> = [];

  constructor(private deliveryService: DeliveryService) {
    this.isLoading = true;
    this.isAvailable = true;
    this.isError = false;
  }


  initialize() {
    this.deliveryService.getCategories(1).catch((err): any => {
      this.isLoading = false;
      this.isError = true;
      console.log(err);
    }).subscribe((data: any) => {
      let json = JSON.stringify(data);
      let catArray = JSON.parse(json);
      if (catArray) {
        if (catArray.length > 1) {
          this.categories = catArray;
          this.isAvailable = true;
          this.isError = false;
        } else {
          this.isAvailable = false;
          this.isError = false;
        }
      } else {
        this.isAvailable = false;
        this.isError = false;
      }
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.initialize();
  }

}
