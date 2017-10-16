import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { CartService } from '../../cart/cart.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ RouterModule, CommonModule, ReactiveFormsModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ],
    providers: [CartService]
})

export class NavbarModule {}
