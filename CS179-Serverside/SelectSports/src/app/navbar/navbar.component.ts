import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  data: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.authService.profile().subscribe(
      (res) => {
        if (res.success) {
          this.data = res.data;
        }
      }
    );
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in
    return this.authService.isAuthenticated();
  }
}
