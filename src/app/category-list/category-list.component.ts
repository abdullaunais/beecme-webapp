import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../services/delivery.service";
import { ObservableInput } from 'rxjs/Observable';
import { ObjectStorage } from '../utilities/object-storage';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [DeliveryService]
})
export class CategoryListComponent implements OnInit {
  isLoading: boolean;
  isAvailable: boolean;
  isError: boolean;

  categories: Array<any> = [];

  city: any;

  constructor(private deliveryService: DeliveryService, private storage: ObjectStorage) {
    this.isLoading = true;
    this.isAvailable = true;
    this.isError = false;

    if(this.storage.get('location.set')) {
      this.city = this.storage.get('location.city');
    } else {
      return;
    }
  }


  initialize() {
    this.deliveryService.getCategories(this.city.id).catch((err): any => {
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
