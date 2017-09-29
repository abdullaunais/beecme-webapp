import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    test: Date = new Date();

    name: string;
    email: string;
    phone: string;
    password: any;
  
    city: any;
    province: any;
    country: any;
  
    validationArray: Array<any> = [];
    // @ViewChildren('forminput') formInputs;
  
    public registerForm = this.formBuilder.group({
      formName: ["", [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z ]{2,30}$/)]],
      formEmail: ["", [Validators.required, Validators.minLength(6), Validators.email]],
      formPhone: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      formPassword: ["", [Validators.required, Validators.minLength(6)]],
      formTermsAndConditions: ["", [Validators.required]],
    });

    constructor(public formBuilder: FormBuilder) {

    }

    checkFullPageBackgroundImage() {
        const $page = $('.full-page');
        const image_src = $page.data('image');

        if (image_src !== undefined) {
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ngOnInit() {
        this.checkFullPageBackgroundImage();
    }

    inputBlur() {
        return;
    }
}
