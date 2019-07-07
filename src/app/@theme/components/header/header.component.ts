import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthJWTToken, NbAuthService , NbTokenService} from '@nebular/auth';
import { User } from '../../../models/User';
import { AddTruckService } from '../../../pages/truck/mapa/add-truck/add-truck.service';
import { MapaService } from '../../../pages/truck/mapa/mapa.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: User;
  

  userMenu = [{ title: 'Profil' }, { title: 'Wyloguj', link : '/auth/logout'}];
  tag = 'my-context-menu'

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService , 
              private tokenService: NbTokenService,
              private authService: NbAuthService,
              private truckService: AddTruckService,
              private mapaService: MapaService) {
               
                menuService.onItemClick()
                .pipe(filter(({ tag }) => tag === this.tag))
                .subscribe(bag => {
                  if (bag.item.title === 'Wyloguj') {
                      this.mapaService.loggedOfWithOpenedWindow = true;                 
                  }
                });
  }

  onItemSelection( title ) {
    if (title == 'Wyloguj') {
      console.log("logout clicked")
      this.mapaService.ref.close;
      
    }
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
