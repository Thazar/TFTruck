import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NbAuthService ,NbAuthJWTToken} from '@nebular/auth';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

    authService: NbAuthService;

    constructor(private router: Router , authService: NbAuthService) { 
      this.authService = authService;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
      this.authService.getToken().subscribe((token:NbAuthJWTToken) => { 
        if (token.isValid()) {
        }
      });


        return this.authService.isAuthenticated()
          .pipe(
            tap(authenticated => {
              if (!authenticated) {
                this.router.navigate(['auth/login']);
              }
            }),
        );
    }
}