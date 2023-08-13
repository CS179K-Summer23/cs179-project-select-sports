import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}


  canActivate(): boolean {
    
    if (this.authService.UserAuthenticated()) {

      
       
      

      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
