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
  maxC: number = 1;

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
      const rollingReelImage1 = document.getElementById('rolling_reel-image-1');
      const reelImage1 = document.getElementById('reel-image-1');
      const rollingReelImage2 = document.getElementById('rolling_reel-image-2');
      const reelImage2 = document.getElementById('reel-image-2');
      const rollingReelImage3 = document.getElementById('rolling_reel-image-3');
      const reelImage3 = document.getElementById('reel-image-3');

      if (rollingReelImage1 && reelImage1 && rollingReelImage2 && reelImage2 && rollingReelImage3 && reelImage3) {
        rollingReelImage1.style.display = 'inline';
        reelImage1.style.display = 'none';
        rollingReelImage2.style.display = 'inline';
        reelImage2.style.display = 'none';
        rollingReelImage3.style.display = 'inline';
        reelImage3.style.display = 'none';
        setTimeout(() => {
          const randomNumber1 = Math.floor(Math.random() * 9) + 1;
          const randomNumber2 = Math.floor(Math.random() * 9) + 1;
          const randomNumber3 = Math.floor(Math.random() * 9) + 1;
          const newrolling1 = document.getElementById('rolling_reel-image-1'+randomNumber1);
          const newrolling2 = document.getElementById('rolling_reel-image-2'+randomNumber2);
          const newrolling3 = document.getElementById('rolling_reel-image-3'+randomNumber3);
          if(newrolling1 && newrolling2 && newrolling3){
            rollingReelImage1.style.display = 'none';
            rollingReelImage2.style.display = 'none';
            rollingReelImage3.style.display = 'none';
            newrolling1.style.display = 'inline';
            newrolling2.style.display = 'inline';
            newrolling3.style.display = 'inline';
          }
          setTimeout(() => {
            const randomPoints = Math.floor(Math.random() * 141) + 10;
            this.userForm.points += randomPoints;
            this.Counter++;
            alert("You got " + randomPoints + " points");
            if(newrolling1 && newrolling2 && newrolling3){
              newrolling1.style.display = 'none';
              reelImage1.style.display = 'inline';
              newrolling2.style.display = 'none';
              reelImage2.style.display = 'inline';
              newrolling3.style.display = 'none';
              reelImage3.style.display = 'inline';
            }
          }, 1000);    
        }, 4500);
      }      
    }else {
      alert('You have reached daily points limit.');
    }
  }

}