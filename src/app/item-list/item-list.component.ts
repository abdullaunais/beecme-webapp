import { Component } from '@angular/core';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
    itemList : Array<any> = [1,2,3];
    constructor() {}
}
