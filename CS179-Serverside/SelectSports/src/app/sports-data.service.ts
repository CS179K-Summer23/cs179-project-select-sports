import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SportsDataService {
  private apiKey = '60130162';
  private baseUrl = 'https://www.thesportsdb.com/api/v1/json/';
  private v2Url = 'https://www.thesportsdb.com/api/v2/json/';

  constructor(private http: HttpClient) { }

  getScoresByLeagues(leagueIds: string[]): Observable<any[]> {
    const requests: Observable<any>[] = [];
    leagueIds.forEach(leagueId => {
      const url = `${this.baseUrl}${this.apiKey}/eventspastleague.php?id=${leagueId}`;
      const request = this.http.get(url);
      requests.push(request);
    });
    return forkJoin(requests);
  }

  searchData(query: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/searchteams.php?t=${query}`;
    const request = this.http.get(url);
    return request;
  }

  searchLeagues(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.apiKey}/search_all_leagues.php?s=${query}`);
  }

  searchTeams(query: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/searchteams.php?t=${query}`;
    const request = this.http.get(url);
    return request;
  }

  searchPlayers(query: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/searchplayers.php?t=${query}`;
    const request = this.http.get(url);
    return request;
  }
}
