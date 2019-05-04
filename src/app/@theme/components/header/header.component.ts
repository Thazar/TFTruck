import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthJWTToken, NbAuthService , NbTokenService} from '@nebular/auth';
import { User } from '../../../models/User';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: User;

  userMenu = [{ title: 'Profile' }, { title: 'Log out', link : '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService , 
              private tokenService: NbTokenService,
              private authService: NbAuthService) {

         
  }

  ngOnInit() {
   
    this.tokenService.get().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
          this.user = token.getPayload();
          this.user.displayName = this.user.firstName + " " + this.user.lastName;
      }
   });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
