import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { NoopAnimationPlayer } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

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
  BetForm = { team: '', home: ''};
  Placed: { [key: number]: boolean } = {};
  InitializeBet: { [key: number]: boolean } = {}
  MyBets=false;
  BaseBall= false;
  BasketBall=false;
  Soccer=false;
  FootBall=false;
  footballEvents: any;
  Ready=false;
  Visible= false;
  betClick =false;

  BetResult: { [key: number]: string} = {};
  

  constructor(private auth:AuthService, private spinner:NgxSpinnerService){

  }
  ngOnInit(): void {

    this.auth.profile().subscribe(
      (res) => {
        if (res.success) {
          this.currentUser = res.data;
          console.log("User Authenticated")
          this.CurrentBets();
          this.BetsEvents();
        
          this.Ready=true;
          
         
        } 
      },
      (err) => {}
    );


    
    
    
  }

  
BetsEvents(){
  
  
  this.auth.getEventsbyID(this.PlayedEvents).subscribe((res:any)=>{
    this.BetsPlacedEvents=res;
   
  // this.BetsPlacedEvents.
 // this.Events = this.Events.filter((event:any) => !this.PlayedEvents.some((playedEvent: any) => playedEvent.EventID === event.idEvent));

    

    
    for(let i=0; i<this.PlayedEvents.length; i++){
      
      if((this.BetsPlacedEvents[i].events[0].idEvent==this.PlayedEvents[i].EventID) && this.PlayedEvents[i].BettingTeamID=="Home"){
        
       if(this.BetsPlacedEvents[i].events[0].intHomeScore>this.BetsPlacedEvents[i].events[0].intAwayScore){
        this.BetResult[this.BetsPlacedEvents[i].events[0].idEvent] = "You Won the BET! on Home Team";
        
       }
       else{
        this.BetResult[this.BetsPlacedEvents[i].events[0].idEvent] = "You Lost the BET! on Home Team";
       }

      }
      else if((this.BetsPlacedEvents[i].events[0].idEvent===this.PlayedEvents[i].EventID) && this.PlayedEvents[i].BettingTeamID==="Away"){
        if(this.BetsPlacedEvents[i].events[0].intHomeScore<this.BetsPlacedEvents[i].events[0].intAwayScore){
          this.BetResult[this.BetsPlacedEvents[i].events[0].idEvent] = "You Won the BET! on Away Team";
         }
         else{
          this.BetResult[this.BetsPlacedEvents[i].events[0].idEvent] = "You Lost the BET! on Away Team";
         }
      }

    }
   
  });
  
  
return true;
}
  BetsAvailable(){
      this.BetAvailable = true; 

  }
  fetchEventsbyDate(){

   
    
    //const currentDate = new Date().toISOString().slice(0, 10);
    const currentDate="2023-08-13";
    var game="";
    if(this.BaseBall){
      game ="Baseball";
    }
    if(this.BasketBall){
      game ="Basketball";
    }
    if(this.FootBall){
      game="American Football";
    }
    if(this.Soccer){
      game="Soccer";
    }
    
    


    this.auth.getEventsbyDate(currentDate,game).subscribe((res:any)=>{
      this.Events = res.events;
     
      if(this.PlayedEvents && this.Events){
      //  console.log(this.BetsPlacedEvents);
       // this.BetsPlacedEvents = this.Events.filter((event:any) => this.PlayedEvents.some((playedEvent: any) => playedEvent.EventID === event.idEvent));
           this.Events = this.Events.filter((event:any) => !this.PlayedEvents.some((playedEvent: any) => playedEvent.EventID === event.idEvent));
             for (const i of this.Events) {
              this.Placed[i.idEvent] = false;
              this.InitializeBet[i.idEvent] = false;
            }
      }
      else{
        var length= this.Events.length;
      for (const i of length) {
          this.Placed[i.idEvent] = false;
         this.InitializeBet[i.idEvent] = false;
        }
      }
      
//filer only showing non-bet events
//filter events by sports
    });
   
   return true;
  
  }
  CurrentBets(){
    
    this.auth.getBets(this.currentUser.email).subscribe(
      (res) => {
        this.PlayedEvents = res.PlacedBets;
        
      
       
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
  toggleBasketball(){
   
this.Visible=false;


      this.BasketBall=true;
      this.FootBall=false;
      this.BaseBall=false;
      this.Soccer=false;
      if(this.fetchEventsbyDate()){
        this.Visible=true;
      }
      
      
  }
  toggleFootball(){
    this.Visible=false;
    this.BasketBall=false;
      this.FootBall=true;
      this.BaseBall=false;
      this.Soccer=false;
      if(this.fetchEventsbyDate()){
        this.Visible=true;
      }
  }
  toggleBaseball(){
    this.Visible=false;
    this.BasketBall=false;
      this.FootBall=false;
      this.BaseBall=true;
      this.Soccer=false;
    
      if(this.fetchEventsbyDate()){
        this.Visible=true;
      }
  }
  toggleSoccer(){
    this.Visible=false;
    this.BasketBall=false;
    this.FootBall=false;
    this.BaseBall=false;
    this.Soccer=true;
   
    if(this.fetchEventsbyDate()){
      this.Visible=true;
    }
  }
  toggleBets(){
    this.betClick=true;
this.BetAvailable=false;
if(this.BetsEvents()){
  console.log("hi");
  this.MyBets=true;
}


  }
  toggleAvailable(){

    this.BetAvailable=true;
    this.MyBets=false;
  }

   
  


  place(){
   // this.Placed=true;


  }

}
