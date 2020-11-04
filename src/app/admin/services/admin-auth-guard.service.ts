import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/service/auth.service';
import { UserService } from 'shared/service/user.service';
import {switchMap,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth:AuthService,
    private userService:UserService) { }

  canActivate(){

    return this.auth.appUser$.pipe(map(appuser=>appuser.isAdmin));
  }
}
