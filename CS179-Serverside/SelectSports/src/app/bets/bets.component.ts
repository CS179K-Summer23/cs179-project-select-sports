import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { NoopAnimationPlayer } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css'],
  animations: [
    trigger('fadeOut', [
        state('visible', style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('300ms')),
    ]),
    trigger('fadeIn', [
        state('visible', style({ transform: 'rotateY(360deg) rotateZ(360deg)  rotateX(360deg)',})),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('2s ease-in')),
    ]),
],
})
export class BetsComponent implements OnInit{
  //PlaceBet: boolean = false;
  //Placed: boolean = false;
  BetAvailable : boolean = false;
  //NotPlayedEvents: any;
  PlayedEvents: any;
  BetsPlacedEvents:any
  currentUser: any;
  Events : any;
  BetForm = { team: '' };
  Placed: { [key: number]: boolean } = {};
  InitializeBet: { [key: number]: boolean } = {}
  MyBets=false;

  constructor(private auth:AuthService){

  }
  ngOnInit(): void {

    this.auth.profile().subscribe(
      (res) => {
        if (res.success) {
          this.currentUser = res.data;
          console.log("User Authenticated")
          this.CurrentBets();
          this.fetchEventsbyDate();
         
        } 
      },
      (err) => {}
    );


    
    
    
  }

  

  BetsAvailable(){
      this.BetAvailable = true; 

  }
  fetchEventsbyDate(){

   
    
    const currentDate = new Date().toISOString().slice(0, 10);
    this.auth.getEventsbyDate(currentDate).subscribe((res:any)=>{
      this.Events = res;
//filer only showing non-bet events
console.log(this.Events);
this.BetsPlacedEvents = this.Events.events.filter((event:any) => this.PlayedEvents.some((playedEvent: any) => playedEvent.EventID === event.idEvent));
      console.log(this.BetsPlacedEvents);
      this.Events = this.Events.events.filter((event:any) => !this.PlayedEvents.some((playedEvent: any) => playedEvent.EventID === event.idEvent));
      console.log(this.Events);
      

      for (const i of this.Events) {
        this.Placed[i.idEvent] = false;
        this.InitializeBet[i.idEvent] = false;
      }

     
    });
   
    
  }
  CurrentBets(){
    
    this.auth.getBets(this.currentUser.email).subscribe(
      (res) => {
        this.PlayedEvents = res.PlacedBets;
        console.log(this.PlayedEvents);
      
       
      },
      (error) => {
        console.error('Error fetching followings:', error);
      }
    );
    return true;
  }

  updateStatus(idEvent:any){
   // this.Placed[idEvent] = false;
  this.Placed[idEvent] = !this.Placed[idEvent];
  }

  submitBet(EventID:any, BettingTeamID:any){
    
    this.Placed[EventID] = !this.Placed[EventID];
    this.auth.submitBet(this.currentUser.email,EventID,BettingTeamID).subscribe(
      (res:any) => {
         
       },
       err => {
         console.error(err);
       }
     );


    
  }

  toggleBets(){
this.BetAvailable=false;
this.MyBets=true;
  }
  toggleAvailable(){

    this.BetAvailable=true;
    this.MyBets=false;
  }

   
  


  place(){
   // this.Placed=true;
console.log(this.BetForm);

  }

}
