import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  //private apiKey = '601538b3642945e69c7e30cf879cbdd4';
  private  apiKey = 'bc21df2ca0dc423ea4d0b4d44639e062'
  private baseUrl = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  getTopAmericanSportsNews(): Observable<any> {
    const url = `${this.baseUrl}top-headlines?country=us&category=sports&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getTeamNews(teamName: string): Observable<any> {
    const result = teamName.replace(/ /g, "");
    const url = `${this.baseUrl}top-headlines?q=${result}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getLeagueNews(leagueName: string): Observable<any> {
    const result = leagueName.replace(/ /g, "%20");
    /*
    switch(leagueName) { 
      case "German Bundesliga": { 
         result = "Bundesliga";
         break; 
      } 
      case "English Premier League": { 
         result = "EPL";
         break; 
      }
      case "Spanish La Liga": {
          result = "LaLiga";
          break;
      }
      case "American Major League Soccer": {
        result = "MLS";
        break;
      }
      case "Italian Serie A": {
        result = "Serie-A";
        break;
      }
      case "Ligue 1": {
        result = "Ligue-1";
        break;
      }
      case "English League Championship": {
        result = "EFL-championship";
        break;
      }
      default: { 
         result = leagueName;
         break; 
      }
      
   } 
   */
    const url = `${this.baseUrl}everything?q=${result}&language=en&apiKey=${this.apiKey}`;
    console.log(url);
    return this.http.get(url);
  }

  getPlayerNews(playerName: string): Observable<any> {
    const result = playerName.replace(/ /g, "");
    const url = `${this.baseUrl}top-headlines?q=${result}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
