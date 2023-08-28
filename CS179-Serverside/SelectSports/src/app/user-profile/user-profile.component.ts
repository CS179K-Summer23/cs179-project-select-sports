import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  data: any;
  lastLoginTimestamp: number | null = null;
  remainingTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  countdownInterval: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profile();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  profile() {
    this.auth.profile().subscribe(
      (res) => {
        if (res.success) {
          this.data = res.data;
          this.lastLoginTimestamp = res.data.dailyAccessTime;
          if (this.lastLoginTimestamp) {
            this.calculateRemainingTime();
            this.countdownInterval = setInterval(() => {
              this.calculateRemainingTime();
            }, 1000);
          }
        } else {
          this.logout();
        }
      },
      (err) => {}
    );
  }

  logout() {
    
    localStorage.clear();
    this.auth.SetLoggedOut();
    this.router.navigate(['/SignIn']);
  }

  ProfileEditt() {
    this.router.navigate(['/profileEdit'], { state: { user: this.data } });
  }

  ViewTable() {
    this.router.navigate(['/RecordTable'], { state: { user: this.data } });
  }

  dailyLogin() {
    if (this.checkTime()) {
      this.router.navigate(['/DailyLogin'], { state: { user: this.data } });
    } else {
      
    }
  }
  
  checkTime(){
    if(this.lastLoginTimestamp!= null){
      const one_minute = 60000;
      const one_hour = one_minute * 60;
      const one_day = one_hour * 24;
      const goal = one_day;
      const timeDifference = Date.now() - this.lastLoginTimestamp;
      if ( timeDifference >= goal){
        return true;
      }else{
        const hours = Math.floor((goal - timeDifference) / one_hour);
        const minutes = Math.floor(((goal - timeDifference) % one_hour) / one_minute);
        const seconds = Math.floor(((goal - timeDifference) % one_minute) / 1000);
        alert("Remaining time: " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds");
        return false;
      }
    }else{
      return true; //first time using daily login function
    }
  }

  calculateRemainingTime() {
    if (this.lastLoginTimestamp != null) {
      const one_minute = 60000;
      const one_hour = one_minute * 60;
      const one_day = one_hour * 24;
      const goal = one_day;

      const timeDifference = Date.now() - this.lastLoginTimestamp;

      if (timeDifference < goal) {
        this.remainingTime.hours = Math.floor((goal - timeDifference) / one_hour);
        this.remainingTime.minutes = Math.floor(((goal - timeDifference) % one_hour) / one_minute);
        this.remainingTime.seconds = Math.floor(((goal - timeDifference) % one_minute) / 1000);
      }
    }
  }
  
}