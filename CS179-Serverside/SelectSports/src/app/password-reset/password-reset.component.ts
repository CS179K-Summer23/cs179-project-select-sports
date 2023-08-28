import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  resetToken!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetToken = params['token'];
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.get('newPassword')!.value;

      this.auth.resetPassword(this.resetToken, newPassword).subscribe(
        (res: any) => {
          if (res.success) {
            alert('Password reset successful.');
          } else {
            alert('Error resetting password.');
          }
        },
        (err: any) => {
          alert('Error resetting password.');
        }
      );
    }
  }
}
