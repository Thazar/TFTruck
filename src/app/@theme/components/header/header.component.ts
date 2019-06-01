import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthJWTToken, NbAuthService , NbTokenService} from '@nebular/auth';
import { User } from '../../../models/User';
import { AddTruckService } from '../../../pages/truck/mapa/add-truck/add-truck.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: User;

  userMenu = [{ title: 'Profil' }, { title: 'Wyloguj', link : '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService , 
              private tokenService: NbTokenService,
              private authService: NbAuthService,
              private truckService: AddTruckService) {

         
  }

  ngOnInit() {
   
    this.tokenService.get().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
          this.user = token.getPayload();
          this.user.displayName = this.user.firstName + " " + this.user.lastName;
          this.truckService.email = this.user.email;
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
