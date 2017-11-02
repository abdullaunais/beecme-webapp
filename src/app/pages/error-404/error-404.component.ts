import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-error-404',
    templateUrl: './error-404.component.html'
})

export class Error404Component implements OnInit {
    test: Date = new Date();
    constructor(private router: Router) {}
    ngOnInit() {
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    goToPage(path: string) {
        this.router.navigate(['/home']);
    }
}
