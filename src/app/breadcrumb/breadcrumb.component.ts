import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {
  @Input('breadcrumbArray') breadcrumbArray: any;
  constructor(
  ) {
    
  }

  ngOnInit() {
    
  }
}
