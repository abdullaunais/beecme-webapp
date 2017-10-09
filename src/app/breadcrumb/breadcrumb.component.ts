import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  // providers: [BreadcrumbService]
})

export class BreadcrumbComponent implements OnInit {
  @Input('breadcrumbArray') breadcrumbArray: any;
  // breadcrumbArray: Array<any>;
  // subscription: Subscription;
  constructor(
    // private breadcrumbService: BreadcrumbService
  ) {
    // bread
    // this.subscription = this.breadcrumbService.breadcrumbItem
    // .subscribe((data: any) => {
    //   this.breadcrumbArray = data;
    // });
  }

  ngOnInit() {

  }

}
