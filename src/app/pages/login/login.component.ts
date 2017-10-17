import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ObjectStorage } from '../../utilities/object-storage';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../sidebar/sidebar.service';
import { Message } from '../../beans';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    msg: Message;

    public options = {
        position: ['bottom', 'right'],
        timeOut: 0,
        lastOnBottom: true,
    };

    public loginForm = this.fb.group({
        formEmail: ["", [Validators.required, Validators.minLength(6), Validators.email]],
        formPassword: ["", [Validators.required, Validators.minLength(6)]]
    });

    validationArray: Array<any> = [];
    email: string;
    password: any;

    constructor(
        private element: ElementRef,
        public fb: FormBuilder,
        private storage: ObjectStorage,
        private userService: UserService,
        private router: Router,
        private notify: NotificationsService,
        private sidebarService: SidebarService
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    inputBlur() {
        return;
    }

    validate() {
        // console.log(event);
        // console.log(this.loginForm.value);
        // console.log(this.loginForm);

        let isValid: boolean = true;
        let message: string = "";
        let formIndex: number = 0;
        this.validationArray = [];

        if (this.loginForm.controls.formEmail.errors) {
            isValid = false;
            formIndex = 0;
            if (this.loginForm.controls.formEmail.errors.required)
                message = "Email is required";
            else if (this.loginForm.controls.formEmail.errors.minlength)
                message = "Email is not a valid format";
            else if (this.loginForm.controls.formEmail.errors.email)
                message = "Email is not a valid format";

            this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        }

        if (this.loginForm.controls.formPassword.errors) {
            isValid = false;
            formIndex = 1;
            if (this.loginForm.controls.formPassword.errors.required)
                message = "Password is required";
            else if (this.loginForm.controls.formPassword.errors.minlength)
                message = "Password should be at least 6 charaters long";

            this.validationArray.push({ message: message, valid: isValid, index: formIndex });
        }

        // console.log(this.loginPressed);
        if (!isValid) {
            return;
        } else {
            this.email = this.loginForm.value.formEmail;
            this.password = this.loginForm.value.formPassword;

            this.loginUser();
        }
    }

    loginUser() {
        this.userService.authenticate(this.email, this.password)
            .subscribe(res => {
                console.log(`login status from backend ${JSON.stringify(res)}`);
                if (res.status === 200) {
                    let userData = res.json();
                    console.log(userData);
                    this.storage.set("user.login", true);
                    this.storage.set("user.data", userData);
                    this.storage.set("user.authToken", userData.authToken);
                    this.sidebarService.changeLogin({ user: userData, isLogin: true });
                    this.router.navigateByUrl('/home?login=success');
                    console.log(`LOGIN SUCCESS FOR  ${userData}`);
                }
            },
            err => {
                console.log(`LOGIN ISSUE  ${JSON.stringify(err)}`);
                this.msg = new Message();
                this.msg = err.json();
                this.msg.message = this.toTitleCase(this.msg.message);
                const toast = this.notify.error('Error!', this.msg.message, {
                    timeOut: 6000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                });
            }
            );

    }
    /*    
        loginUser() {
            if (!this.email && !this.password) {
                return;
            }
    
            this.userService.authenticate(this.email, this.password).catch((err):any => {
                if (err.status === 401) {
                    console.log(err);
                    this.msg = new Message();
                    this.msg = err.json();
                     
                } else {
    
                }
            }).subscribe((response) => {
                let userData = response;
                console.info(userData);
                this.storage.set("user.login", true);
                this.storage.set("user.data", userData);
                this.storage.set("user.authToken", userData.authToken);
    
                this.sidebarService.changeLogin({user: userData, isLogin: true});
    
                this.router.navigate(['/home']);
                // this.variables.setLogin(true);
                // Variables.user.username = userData.username;
                // Variables.user.email = userData.email;
    
                // this.events.publish("user:change");
                // if (this.redirectString === "redirect-deliveryschedule") {
                //     this.navCtrl.setRoot('CheckoutOptionsPage', null, { animate: true, direction: "forward" });
                // } else if (this.redirectString === "redirect-accountpage") {
                //     this.navCtrl.setRoot('UserProfilePage', null, { animate: true, direction: "forward" });
                // } else if (this.redirectString === "redirect-orderhistory") {
                //     this.navCtrl.setRoot('OrderHistoryPage', null, { animate: true, direction: "forward" });
                // } else {
                //     this.navCtrl.setRoot('Categories', null, { animate: true, direction: "forward" });
                // }
    
            });
        }
        */
    toTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
}
