import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    // Check if the user is logged in
    return this.authService.isAuthenticated();
  }
}
