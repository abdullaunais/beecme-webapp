import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ItemsComponent {
    breadcrumbArray: { title: string; icon: string; path: string; }[];
    constructor(
    ) {
        this.breadcrumbArray = [
            {title: 'Home', icon: 'home', path: 'home'},
            {title: 'Categories', icon: 'apps', path: 'categories'},
            {title: 'Items', icon: 'apps', path: 'items'}
        ]
    }
}
