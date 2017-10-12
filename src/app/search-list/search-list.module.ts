import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from './search-list.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { RouterModule } from '@angular/router';
import { SearchListRoutes } from './search-list.routing';
import { DeliveryService } from '../services/delivery.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SearchListRoutes),
    BreadcrumbModule
  ],
  declarations: [SearchListComponent],
  providers: [DeliveryService]
})
export class SearchListModule { }
