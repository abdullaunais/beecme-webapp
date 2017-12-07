import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ItemsComponent {
    breadcrumbArray: Array<any>;
    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            if (params['category']) {
                this.breadcrumbArray = [
                    { title: 'Home', icon: 'home', path: 'home' },
                    { title: 'Categories', icon: 'apps', path: 'categories' },
                    { title: 'Items', icon: 'bookmark', path: 'shop', queryParams: { category: params['category'], shop: params['shop'] } }
                ];
            }
        });

    }
}
