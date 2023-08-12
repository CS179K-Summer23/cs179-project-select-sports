import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm = { name: '', email: '', password: '', confirmPassword: '', points: 0 };
  showPassword = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.auth.register(this.userForm).subscribe(
      res => {
        alert(res.message);
      },
      err => {
        // Handle registration error
      }
    );
  }

  togglePasswordVisibility(field: string) {
    if (field === 'confirmPassword') {
      this.showPassword = !this.showPassword;
    }
  }
}
