import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  userForm = { email: '', password: '' };
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  Login() {
    this.auth.login(this.userForm).subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/profile']);
        } else {
          alert(res.message);
        }
      },
      (err: any) => {
        alert("Login Unsuccessful");
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
