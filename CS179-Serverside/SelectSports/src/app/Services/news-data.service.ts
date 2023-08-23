import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
// We have 2 keys, if one gets used up switch to the other
//private apiKey = '601538b3642945e69c7e30cf879cbdd4';
private  apiKey = 'bc21df2ca0dc423ea4d0b4d44639e062';

  private baseUrl = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  getTopAmericanSportsNews(): Observable<any> {
    const url = `${this.baseUrl}top-headlines?country=us&category=sports&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getTeamNews(teamName: string): Observable<any> {
    const result = teamName.replace(/ /g, "%20");
    const url = `${this.baseUrl}everything?q=${result}&language=en&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getLeagueNews(leagueName: string): Observable<any> {
    const result = leagueName.replace(/ /g, "%20");
    const url = `${this.baseUrl}everything?q=${result}&language=en&apiKey=${this.apiKey}`;
    console.log(url);
    return this.http.get(url);
  }

  getPlayerNews(playerName: string): Observable<any> {
    const result = playerName.replace(/ /g, "%20");
    const url = `${this.baseUrl}everything?q=${result}&language=en&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
