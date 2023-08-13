import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-daily-login',
  templateUrl: './daily-login.component.html',
  styleUrls: ['./daily-login.component.css']
})
export class DailyLoginComponent implements OnInit {
  userForm = { email: '', points: '', dailyAccessTime: 0};
  Counter: number = 0;
  maxC: number = 2;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = history.state.user;
    if (currentUser) {
      this.userForm.email = currentUser.email;
      this.userForm.points = currentUser.points;
      this.userForm.dailyAccessTime = Date.now();
    }
  }

  DailyLogin() {
    this.auth.DailyLogin(this.userForm).subscribe(
    res=>{
      
    }, err=>{    
      }
   )
    this.router.navigate(['/profile']);
  }

  addPoints() {
    if (this.Counter < this.maxC) {
      const randomPoints = Math.floor(Math.random() * 141) + 10;
      this.userForm.points += randomPoints;
      this.Counter++;
    }else {
      alert('You have reached daily points limit.');
    }
  }
}