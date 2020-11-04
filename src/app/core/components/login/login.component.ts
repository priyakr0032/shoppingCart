import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  constructor(public authService:AuthService) {
   
   }

  login(){
   this.authService.login();
   
  }
}
