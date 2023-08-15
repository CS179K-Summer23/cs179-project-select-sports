import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  private apiKey = '601538b3642945e69c7e30cf879cbdd4';
  private baseUrl = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  getTopAmericanSportsNews(): Observable<any> {
    const url = `${this.baseUrl}top-headlines?country=us&category=sports&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getTeamNews(teamName: string): Observable<any> {
    const url = `${this.baseUrl}top-headlines?q=${teamName}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getLeagueNews(leagueName: string): Observable<any> {
    const url = `${this.baseUrl}top-headlines?q=${leagueName}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getPlayerNews(playerName: string): Observable<any> {
    const url = `${this.baseUrl}top-headlines?q=${playerName}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
