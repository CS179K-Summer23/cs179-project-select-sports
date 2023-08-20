import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private EventsDayAPI = 'https://www.thesportsdb.com/api/v1/json/60130162/eventsday.php';
  private EventsIDAPI = 'https://www.thesportsdb.com/api/v1/json/60130162/lookupevent.php';
  UserLoggedIn: boolean = false;
  currentUser: any;

  constructor(private http:HttpClient) {
    this.UserSessionStorage();
   }
   setCurrentUserProfile(data:any){
    
    this.currentUser=data;
   
   }


  register(data:any):Observable<any>{
    return this.http.post('http://localhost:4000/auth/register', data)
  }

  UserSessionStorage(){
     
  if (localStorage.getItem('UserLoggedIn') === 'true'&&localStorage.getItem('token') ) {
    this.UserLoggedIn = true;
  }
  }

  submitBet(email:any, EventID:any, BettingTeamID:any):Observable<any>{
    const data = {  email, EventID, BettingTeamID };

    return this.http.post('http://localhost:4000/auth/myBets',data)
  }
  getBets(email: string): Observable<any> {
    const url = `http://localhost:4000/auth/myBets/${email}`;
    return this.http.get(url);
  }
  




  login(data:any):Observable<any>{
    
    return this.http.post('http://localhost:4000/auth/SignIn', data)
  }

  SetLoggedIn(){
    if(localStorage.getItem('token')){
      this.UserLoggedIn =true;
      localStorage.setItem('UserLoggedIn', 'true');
    }
   
  }

  GetCurrentUser(){
   
      this.profile().subscribe(
        (res) => {
          if (res.success) {
            this.setCurrentUserProfile(res.data);
            
           
          } else {
            
          }
        },
        (err) => {}
      );
    
   
    return this.currentUser;
  }
  SetLoggedOut(){
    if(!localStorage.getItem('token')){ this.UserLoggedIn = false;
      localStorage.removeItem('UserLoggedIn');}
   
  }
  UserAuthenticated():boolean{
    return this.UserLoggedIn;
  }

  profile():Observable<any>{
    let headers={
      'Authorization':'Bearer '+ localStorage.getItem('token')
    }
    return this.http.get('http://localhost:4000/auth/profile', {headers:headers})
  }

  profileEdit(data:any):Observable<any>{
    return this.http.post('http://localhost:4000/auth/profileEdit', data)
  }

  DailyLogin(data:any):Observable<any>{
    return this.http.post('http://localhost:4000/auth/DailyLogin', data)
  }

  AddPoints(email:any, points:Number):Observable<any>{
   
    const data = { email,points};
    return this.http.post('http://localhost:4000/auth/AddPoints', data)
  }
  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check if the token exists and is not expired
    return !!token;
  }




  getEventsbyDate(date: string, sport: string): Observable<any> {

    
    const params = {d:date, s:sport};
    return this.http.get(this.EventsDayAPI, { params });
  }


  getEventsbyID(playedEvents: any[]): Observable<any[][]> {
    const res: Observable<any[]>[] = [];
    const len= playedEvents.length;
    for(let i=0; i<len; i++){
    const params = {id:playedEvents[i].EventID};
    res.push(this.http.get<any[]>(this.EventsIDAPI, { params }));
  }
  return forkJoin(res);
  }

  getEventbyID(idEvent:any): Observable<any> {
    
    const params = {id:idEvent};
   return(this.http.get<any[]>(this.EventsIDAPI, { params }));
  }
  



  sendEmail(data:any):Observable<any>{
    return this.http.post('http://localhost:4000/sendEmail', data)
  };

 
  FollowTeam(email:any,TeamID:any):Observable<any>{
    const data = {  email, TeamID};

    return this.http.post('http://localhost:4000/auth/myTeams',data)

  };
 
  GetMyTeams(email: string):Observable<any>{
    const url = `http://localhost:4000/auth/myTeams/${email}`;
    return this.http.get(url);
  };
  
}


