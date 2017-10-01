import { ObjectStorage } from '../../utilities/object-storage';
import { SidebarService } from '../../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-logout-cmp',
    templateUrl: './logout.component.html'
})
export class LogoutComponent {
    constructor(
        private storage: ObjectStorage,
        private sidebarService: SidebarService,
        private router: Router
    ) {
        this.storage.remove("user.login");
        this.storage.remove("user.data");
        this.storage.remove("user.authToken");

        let userObject = {
            username: 'My Account'
        }

        this.sidebarService.changeLogin({user: userObject, isLogin: false});

        this.router.navigate(['/home']);
    }
}
