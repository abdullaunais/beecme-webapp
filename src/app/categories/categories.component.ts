import { Component } from '@angular/core';
// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html'
})
export class CategoriesComponent {
    breadcrumbArray: { title: string; icon: string; path: string; }[];
    constructor(
        // private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbArray = [
            {title: 'Home', icon: 'home', path: 'home'},
            {title: 'Categories', icon: 'apps', path: 'categories'}
        ]
    } 
    ngViewAfterInit() {

        // this.breadcrumbService.changeRoute();
    }
}
