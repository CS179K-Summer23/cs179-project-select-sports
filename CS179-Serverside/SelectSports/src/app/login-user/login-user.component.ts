import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  userForm = { emailOrUsername: '', password: '' };
  showPassword = false;
  resetRequest = false;
  codeEmailed = false;
  verificationCode: any;
  codeEntered: any;
  authorized = false;
  PasswordReset = false;

  ResetForm = { emailOrUsername: '', password: '', confirmPassword: '' };
  reset = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  Login() {
    // Check if the input is an email or username
    if (this.userForm.emailOrUsername.includes('@')) {
      // Email login
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
          alert('Login Unsuccessful');
        }
      );
    } else {
      // Username login
      this.auth.loginByUsername(this.userForm).subscribe(
        (res: any) => {
          if (res.success) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/profile']);
          } else {
            alert(res.message);
          }
        },
        (err: any) => {
          alert('Login Unsuccessful');
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirm(field: string) {
    if (field === 'confirmPassword') {
      this.showPassword = !this.showPassword;
    }
  }

  EmailCode() {
    this.verificationCode = uuid();
    this.auth.VerifyEmail(this.ResetForm.emailOrUsername).subscribe((res) => {
      alert('If your email is valid, you will get a verification code in your email!');
      this.codeEmailed = true;
      if (res.success) {
        this.sendmail(this.verificationCode);
        this.codeEmailed = true;
      }
    });
  }

  sendmail(verificationCode: any) {
    let user = {
      email: this.ResetForm.emailOrUsername,
      body: `
        <body style="font-family: Courier New, monospace; background-color: #344ff7; margin: 0;">
          <div style="max-width: 500px; margin: 0 auto; padding: 20px; background-color:#e57979; border-radius: 10px; box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
              <h1 style="font-family: Luminari, fantasy; font-size: 24px; color:b;">Select Sports Password Reset</h1>
              <p style="font-size: 17px; color:black; margin-top: 10px;">Hi User,</p>
              <p style="font-size: 17px;  color:black;">
                You have requested to reset your password! Please enter this verification code and follow the instructions to reset your password!
              </p>
              <h3>${verificationCode}</h3>
            </div>
            <div style="text-align: center; margin-top: 30px;  color:#000000;">
              If you have any questions or need assistance, feel free to contact us.
              <div style="text-align: center; margin-top: 40px; color:black;">
                Best regards,<br>Team Select Sports
              </div>
            </div>
          </div>
        </body>
      `,
    };
    this.auth.sendEmail(user).subscribe((res: any) => {
      console.log(res);
    });
  }

  verifyUserCode() {
    if (this.codeEntered === this.verificationCode) {
      alert('Verification successful');
      this.authorized = true;
    } else {
      alert('Failed to verify code');
    }
  }

  resetPassword() {
    this.auth.reset(this.ResetForm).subscribe((res) => {
      alert(res.message);
      this.PasswordReset = true;
    });
  }

  back() {
    window.location.reload();
    this.router.navigateByUrl('/login');
  }
}
