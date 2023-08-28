import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm = { name: '', email: '', password: '', confirmPassword: '', points: 0 };
  showPassword = false;

  constructor(private auth: AuthService, private router:Router) {}

  ngOnInit(): void {}

  register() {
    console.log(this.userForm);
    this.auth.register(this.userForm).subscribe(
      res => {
        alert(res.message);
        this.router.navigateByUrl('/SignIn');
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
}
