import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportsDataService {
  private apiKey = '3';
  private baseUrl = 'https://www.thesportsdb.com/api/v1/json/';

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
}
