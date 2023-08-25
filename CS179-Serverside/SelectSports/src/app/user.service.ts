import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  getUsersData(criteria: string = 'getuserdata'): Observable<any[]> {
    const url = `${this.baseUrl}${criteria}`;
    return this.http.get<any[]>(url);
  }

  getHighestCurrentPointsLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}leaderboard/highestCurrentPoints`).pipe(
      tap(users => {
        const leaderboard = users.sort((a, b) => b.points - a.points);
        console.log('Highest Current Points Leaderboard:', leaderboard);
      })
    );
  }

  getHighestAllTimePointsLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}leaderboard/highestAllTimePoints`).pipe(
      tap(users => {
        const leaderboard = users.sort((a, b) => b.points - a.points);
        console.log('Highest All Time Points Leaderboard:', leaderboard);
      })
    );
  }
  getMostLostAllTimePointsLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}leaderboard/mostLostAllTimePoints`).pipe(
      tap(users => {
        const leaderboard = users.sort((a, b) => b.points - a.points);
        console.log('Most Lost All Time Points Leaderboard:', leaderboard);
      })
    );
  }
}