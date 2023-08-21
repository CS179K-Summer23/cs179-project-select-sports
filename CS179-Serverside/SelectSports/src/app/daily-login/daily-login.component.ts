import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-daily-login',
  templateUrl: './daily-login.component.html',
  styleUrls: ['./daily-login.component.css']
})
export class DailyLoginComponent implements OnInit {
  userForm = { email: '', points: 0, dailyAccessTime: 0};
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
    this.playbackground();
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
      this.adjustbgm(0.4);
      const rollingReelImage1 = document.getElementById('rolling_reel-image-1');
      const reelImage1 = document.getElementById('reel-image-1');
      const rollingReelImage2 = document.getElementById('rolling_reel-image-2');
      const reelImage2 = document.getElementById('reel-image-2');
      const rollingReelImage3 = document.getElementById('rolling_reel-image-3');
      const reelImage3 = document.getElementById('reel-image-3');

      if (rollingReelImage1 && reelImage1 && rollingReelImage2 && reelImage2 && rollingReelImage3 && reelImage3) {
        const slotSound = document.getElementById('slotSound') as HTMLAudioElement;
        slotSound.volume = 0.6;
        slotSound.currentTime = 0;
        slotSound.play();
        rollingReelImage1.style.display = 'inline';
        reelImage1.style.display = 'none';
        rollingReelImage2.style.display = 'inline';
        reelImage2.style.display = 'none';
        rollingReelImage3.style.display = 'inline';
        reelImage3.style.display = 'none';

        setTimeout(() => {
          const randomNumber1 = Math.floor(Math.random() * 9) + 1;
          const newrolling1 = document.getElementById('rolling_reel-image-1'+randomNumber1);        
          if(newrolling1){
            rollingReelImage1.style.display = 'none';
            newrolling1.style.display = 'inline';
          }
          setTimeout(() => {
            const randomNumber2 = Math.floor(Math.random() * 9) + 1;
            const newrolling2 = document.getElementById('rolling_reel-image-2'+randomNumber2);
            if(newrolling2){
              rollingReelImage2.style.display = 'none';
              newrolling2.style.display = 'inline';
            }
            setTimeout(() => {
              const randomNumber3 = Math.floor(Math.random() * 9) + 1;
              const newrolling3 = document.getElementById('rolling_reel-image-3'+randomNumber3);
              if(newrolling3){
                rollingReelImage3.style.display = 'none';
                newrolling3.style.display = 'inline';
              }
              setTimeout(() => {
                slotSound.pause();
                var PointsToAdd = 0;
                if(randomNumber1 == randomNumber2 && randomNumber2 == randomNumber3){
                  PointsToAdd = 7777;
                  const endSound = document.getElementById('endSound3') as HTMLAudioElement;
                  endSound.play();
                }else if (randomNumber1 == randomNumber2 || randomNumber1 == randomNumber3 || randomNumber2 == randomNumber3){
                  PointsToAdd = 2666;
                  const endSound = document.getElementById('endSound2') as HTMLAudioElement;
                  endSound.play();
                }else{
                  PointsToAdd = 188;
                  const endSound = document.getElementById('endSound') as HTMLAudioElement;
                  endSound.play();
                }
                this.userForm.points += PointsToAdd;
                this.Counter++;
                setTimeout(() => {
                  alert("Congratulations!! You got " + PointsToAdd + " points");
                  this.adjustbgm(1);
                  if(newrolling1 && newrolling2 && newrolling3){
                    newrolling1.style.display = 'none';
                    reelImage1.style.display = 'inline';
                    newrolling2.style.display = 'none';
                    reelImage2.style.display = 'inline';
                    newrolling3.style.display = 'none';
                    reelImage3.style.display = 'inline';
                  }
                },400);
              }, 600);
            }, 600);
          }, 600);    
        }, 2800);
      }      
    }else {
      alert('You have reached daily points limit.');
    }
  }

  cheat() {
    if (this.Counter < this.maxC) {
      this.adjustbgm(0.4);
      const rollingReelImage1 = document.getElementById('rolling_reel-image-1');
      const reelImage1 = document.getElementById('reel-image-1');
      const rollingReelImage2 = document.getElementById('rolling_reel-image-2');
      const reelImage2 = document.getElementById('reel-image-2');
      const rollingReelImage3 = document.getElementById('rolling_reel-image-3');
      const reelImage3 = document.getElementById('reel-image-3');

      if (rollingReelImage1 && reelImage1 && rollingReelImage2 && reelImage2 && rollingReelImage3 && reelImage3) {
        const slotSound = document.getElementById('slotSound') as HTMLAudioElement;
        slotSound.volume = 0.6;
        slotSound.currentTime = 0;
        slotSound.play();
        rollingReelImage1.style.display = 'inline';
        reelImage1.style.display = 'none';
        rollingReelImage2.style.display = 'inline';
        reelImage2.style.display = 'none';
        rollingReelImage3.style.display = 'inline';
        reelImage3.style.display = 'none';

        setTimeout(() => {
          const randomNumber1 = Math.floor(Math.random() * 9) + 1;
          const newrolling1 = document.getElementById('rolling_reel-image-1'+randomNumber1);        
          if(newrolling1){
            rollingReelImage1.style.display = 'none';
            newrolling1.style.display = 'inline';
          }
          setTimeout(() => {
            const randomNumber2 = randomNumber1;
            const newrolling2 = document.getElementById('rolling_reel-image-2'+randomNumber2);
            if(newrolling2){
              rollingReelImage2.style.display = 'none';
              newrolling2.style.display = 'inline';
            }
            setTimeout(() => {
              const randomNumber3 = randomNumber1;
              const newrolling3 = document.getElementById('rolling_reel-image-3'+randomNumber3);
              if(newrolling3){
                rollingReelImage3.style.display = 'none';
                newrolling3.style.display = 'inline';
              }
              setTimeout(() => {
                slotSound.pause();
                var PointsToAdd = 0;
                if(randomNumber1 == randomNumber2 && randomNumber2 == randomNumber3){
                  PointsToAdd = 7777;
                  const endSound = document.getElementById('endSound3') as HTMLAudioElement;
                  endSound.play();
                }else if (randomNumber1 == randomNumber2 || randomNumber1 == randomNumber3 || randomNumber2 == randomNumber3){
                  PointsToAdd = 2666;
                  const endSound = document.getElementById('endSound2') as HTMLAudioElement;
                  endSound.play();
                }else{
                  PointsToAdd = 188;
                  const endSound = document.getElementById('endSound') as HTMLAudioElement;
                  endSound.play();
                }
                this.userForm.points += PointsToAdd;
                this.Counter++;
                setTimeout(() => {
                  alert("Congratulations!! You got " + PointsToAdd + " points");
                  this.adjustbgm(1);
                  if(newrolling1 && newrolling2 && newrolling3){
                    newrolling1.style.display = 'none';
                    reelImage1.style.display = 'inline';
                    newrolling2.style.display = 'none';
                    reelImage2.style.display = 'inline';
                    newrolling3.style.display = 'none';
                    reelImage3.style.display = 'inline';
                  }
                },400);
              }, 600);
            }, 600);
          }, 600);    
        }, 2800);
      }      
    }else {
      alert('You have reached daily points limit.');
    }
  }

  playbackground(){
    const bgm = document.getElementById('backgroundSound') as HTMLAudioElement;
    bgm.currentTime = 0;
    bgm.play();
  }

  adjustbgm(volume:number) {
    const bgm = document.getElementById('backgroundSound') as HTMLAudioElement;
    bgm.volume = volume;
  }

}