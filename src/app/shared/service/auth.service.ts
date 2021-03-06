import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap,map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(private afAuth:AngularFireAuth,
    private route:ActivatedRoute,
    private router:Router,
    private user:UserService) {
    this.user$ = afAuth.authState;
   }


  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut(){
  this.afAuth.auth.signOut();
}

get appUser$():Observable<AppUser>{
 return this.user$.pipe(switchMap(user =>{
   if(user){
   return  this.user.get(user.uid).valueChanges()
  }else{
    return of(null);
  }
  }));
}
}
