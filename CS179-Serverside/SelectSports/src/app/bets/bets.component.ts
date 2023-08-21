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
  points:any;
  BetResult: { [key: number]: string} = {};
  BetEvent: any;
  

  constructor(private auth:AuthService, private spinner:NgxSpinnerService){

  }
  ngOnInit(): void {
  

    this.auth.profile().subscribe(
      (res) => {
        if (res.success) {
          this.currentUser = res.data;
          this.points = this.currentUser.points;
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
        
        this.points = this.points+50;
        this.auth.AddPoints(this.currentUser.email, this.points).subscribe((res:any)=>{
         
        });
      
       }
       else{
        this.BetResult[this.BetsPlacedEvents[i].events[0].idEvent] = "You Lost the BET! on Home Team";
       }

      }
      else if((this.BetsPlacedEvents[i].events[0].idEvent===this.PlayedEvents[i].EventID) && this.PlayedEvents[i].BettingTeamID==="Away"){
        if(this.BetsPlacedEvents[i].events[0].intHomeScore<this.BetsPlacedEvents[i].events[0].intAwayScore){
          this.BetResult[this.BetsPlacedEvents[i].events[0].idEvent] = "You Won the BET! on Away Team";
          
          this.points = this.points+50;
        this.auth.AddPoints(this.currentUser.email, this.points).subscribe((res:any)=>{
         
        });
      
        
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
     this.auth.getEventbyID(EventID).subscribe((res)=>{
      this.BetEvent=res;
      console.log(this.BetEvent.events[0].idEvent);
      let user={
        name:this.currentUser.name,
        email:this.currentUser.email,
        body:`<body class="bg-light">
        <div class="container">
          
          <div class="card p-6 p-lg-10 space-y-4">
            <h1 class="h3 fw-700">
              Your Bet has been placed successfully! 
            </h1>
            <p>
            <div class="column card GameCard" style=" margin:20px; width:45rem; background-image: url('${this.BetEvent.events[0].strThumb}'); background-repeat: no-repeat; background-position: center center; background-size: 45rem 28rem;  height: 28rem;">
            <div class="card-body">
              <div class="container" style="text-align: center; background-color:#fff6fff7; padding:10px;">
                <h4 style="margin-bottom:20px;">${this.BetEvent.events[0].strLeague}&nbsp;${this.BetEvent.events[0].strSeason}</h4>
                <div class="row">
                  <div class="col-md" style="text-align:center;">
                    <p style="margin-bottom:1px;">(Home)</p>
                    <h5>${this.BetEvent.events[0].strHomeTeam}</h5>
                    
                  </div>
                  <div class="col-sm" style="text-align:center;">
                  <h3>VS</h3>
                  <p>${this.BetEvent.events[0].dateEvent}</p>
                  </div>
                  <div class="col-md" style="text-align:center;">
                    <p style="margin-bottom:1px;">(Away)</p>
                    <h5>${this.BetEvent.events[0].strAwayTeam}</h5>
                   
                  </div>
                </div>
              </div>
              
              <hr>
            
            
           
            
            </div>
          </div>
    
              You have bet in favor of ${BettingTeamID}! come back at the end of game for your results! 
            </p>
            <a class="btn btn-primary p-3 fw-700" href="#">Visit Website</a>
          </div>
          <div class="text-muted text-center my-6">
            
            
          Team Select Sports
          </div>
        </div>
      </body>`,
      }
      this.auth.sendEmail(user).subscribe((res:any)=>{
        console.log(res);
      });

    });
    
     
    
    

   
    return true;
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
  console.log("hii");
  
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

