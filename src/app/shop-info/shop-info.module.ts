import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopInfoComponent } from './shop-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShopInfoComponent],
  exports: [ShopInfoComponent]
})
export class ShopInfoModule { }
