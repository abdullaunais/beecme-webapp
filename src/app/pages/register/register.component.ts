import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SidebarService } from '../../sidebar/sidebar.service';
import { ObjectStorage } from '../../utilities/object-storage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html',
    providers: [UserService]
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

    constructor(
        public formBuilder: FormBuilder,
        private storage: ObjectStorage,
        private userService: UserService,
        private sidebarService: SidebarService,
        private router: Router
    ) {
        this.country = this.storage.get('location.country');
        this.province = this.storage.get('location.province');
        this.city = this.storage.get('location.city');
    }
    ngOnInit() { }


    validate() {
        let isValid: boolean = true;
        let message: string = "";
        let formIndex: number = 0;
        this.validationArray = [];

        if (this.registerForm.controls.formName.errors) {
            isValid = false;
            formIndex = 0;
            if (this.registerForm.controls.formName.errors.required) {
                message = "Name is required";
            } else if (this.registerForm.controls.formName.errors.minlength) {
                message = "Name should be at least 4 charaters long";
            } else if (this.registerForm.controls.formName.errors.pattern) {
                message = "Name is not in a valid format";
            }
            this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        }

        if (this.registerForm.controls.formEmail.errors) {
            isValid = false;
            formIndex = 1;
            if (this.registerForm.controls.formEmail.errors.required) {
                message = "Email is required";
            } else if (this.registerForm.controls.formEmail.errors.minlength) {
                message = "Email is not a valid format";
            } else if (this.registerForm.controls.formEmail.errors.email) {
                message = "Email is not a valid format";
            }
            this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        }

        if (this.registerForm.controls.formPhone.errors) {
            isValid = false;
            formIndex = 2;
            if (this.registerForm.controls.formPhone.errors.required) {
                message = "Phone is required";
            } else if (this.registerForm.controls.formPhone.errors.minlength) {
                message = "Phone should have at least 9 numbers";
            } else if (this.registerForm.controls.formPhone.errors.maxlength) {
                message = "Phone cannot be more than 10 numbers";
            }
            this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        }


        if (this.registerForm.controls.formPassword.errors) {
            isValid = false;
            formIndex = 3;
            if (this.registerForm.controls.formPassword.errors.required) {
                message = "Password is required";
            } else if (this.registerForm.controls.formPassword.errors.minlength) {
                message = "Password should be at least 6 charaters long";
            }
            this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        }

        if (!isValid) {
            //validations
            return;
        } else {
            this.name = this.registerForm.value.formName.replace(/[^A-Za-z0-9_'-]/gi, '');
            this.email = this.registerForm.value.formEmail;
            this.phone = this.registerForm.value.formPhone;
            this.password = this.registerForm.value.formPassword;

            this.registerUser();

            return;
        }
    }



    registerUser() {

        let user = {
            "username": this.name,
            "email": this.email,
            "password": this.password,
            "phone": this.phone,
            "country": this.country.id,
            "province": this.province.id,
            "city": this.city.id,
            "type": "1",
            "notificationSend": "0"
        };
        this.userService.registerUser(user).catch((err): any => {

        }).subscribe((response) => {

            if (response.code === 1) {
                // register success
                this.userService.authenticate(this.email, this.password).catch((err): any => {

                }).subscribe(userData => {
                    console.info(userData);
                    this.storage.set("user.login", true);
                    this.storage.set("user.data", userData);
                    this.storage.set("user.authToken", userData.authToken);

                    this.sidebarService.changeLogin({ user: userData, isLogin: true });

                    this.router.navigate(['/home']);
                });
            } else if (response.code < 0) {
                if (response.message === "Request failed. Code already exists") {

                } else {

                }
            } else {
            }
        });
    }

    inputBlur() {
        return;
    }
}
