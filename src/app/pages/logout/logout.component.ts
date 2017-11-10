import { ObjectStorage } from '../../utilities/object-storage';
import { SidebarService } from '../../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Constant } from '../../services/constant';

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
        this.storage.remove(Constant.USER_SET);
        this.storage.remove(Constant.USER_OBJECT);
        this.storage.remove(Constant.AUTHENTICATION_TOKEN);

        const userObject = {
            username: 'My Account'
        };

        this.sidebarService.changeLogin({user: userObject, isLogin: false});

        this.router.navigateByUrl('/home?logout=success');
    }
}
