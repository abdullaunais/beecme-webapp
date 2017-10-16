import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SidebarService } from '../../sidebar/sidebar.service';
import { ObjectStorage } from '../../utilities/object-storage';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

declare var swal: any;
declare var $: any;

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

    public options = {
        position: ['bottom', 'right'],
        timeOut: 0,
        lastOnBottom: true,
    };

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
        private router: Router,
        private notify: NotificationsService,
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

        // if (this.registerForm.controls.formTermsAndConditions.errors) {
        //     isValid = false;
        //     formIndex = 4;
        //     if (this.registerForm.controls.formPassword.errors.required) {
        //         message = "You must agree the terms and conditions";
        //     }
        //     this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        // }

        if (!isValid) {
            //validations
            this.validationArray.forEach(error => {
                $('#forminput' + error.index).notify(
                    error.message, 
                    { 
                        position:"bottom right",
                        elementPosition: 'bottom right',
                        globalPosition: 'bottom right',
                        autoHideDelay: 500000,
                     }
                  );
            });
            

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
                    console.log(`register status ${userData}`);
                    this.storage.set("user.login", true);
                    this.storage.set("user.data", userData);
                    this.storage.set("user.authToken", userData);

                    this.sidebarService.changeLogin({ user: userData, isLogin: true });

                    swal({
                        type: 'success',
                        title: 'Success!',
                        text: 'Registration Successful!',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).then(() => {
                        this.router.navigateByUrl('/home?register=success');
                    });


                });
            } else if (response.code < 0) {
                const toast = this.notify.error('Error!', response.message, {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                });
            } else {
            }
        });
    }

    inputBlur() {
        return;
    }
}
