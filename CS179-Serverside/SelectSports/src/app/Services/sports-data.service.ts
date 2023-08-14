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

  search(query: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/searchteams.php?t=${query}`;
    return this.http.get(url);
  }

  getTeamDetails(teamId: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/lookupteam.php?id=${teamId}`;
    return this.http.get(url);
  }

  getUpcomingGames(teamId: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/eventsnext.php?id=${teamId}`;
    return this.http.get(url);
  }

  getPastGames(teamId: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/eventslast.php?id=${teamId}`;
    return this.http.get(url);
  }

  getTeamPlayers(teamId: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/lookup_all_players.php?id=${teamId}`;
    return this.http.get(url);
  }

  getLeagueDetailsById(leagueId: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/lookupleague.php?id=${leagueId}`;
    return this.http.get(url);
  }
  
  getPlayerDetails(playerId: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/lookupplayer.php?id=${playerId}`;
    return this.http.get(url);
  }
}
