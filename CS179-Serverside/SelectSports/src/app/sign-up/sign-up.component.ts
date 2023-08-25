import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    points: 0
  };
  showPassword = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userForm.username = this.getDefaultUsername(this.userForm.email);
  }

  register() {
    console.log(this.userForm);
    this.auth.register(this.userForm).subscribe(
      res => {
        alert(res.message);
      },
      err => {
        console.log(err);
        // Handle registration error
      }
    );
  }

  togglePasswordVisibility(field: string) {
    if (field === 'confirmPassword') {
      this.showPassword = !this.showPassword;
    }
  }

  getDefaultUsername(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    } else {
      return '';
    }
  }
}
