import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  //private apiKey = '601538b3642945e69c7e30cf879cbdd4';
  private apiKey = 'bc21df2ca0dc423ea4d0b4d44639e062';
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
}
