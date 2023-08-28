import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  searchQuery: string = '';
  showResults: boolean = false;
  searchResults: any[] = [];
  teamResults: any[] = [];
  playerResults: any[] = [];

  private searchSubject = new Subject<string>();

  constructor(private router: Router, private sportsDataService: SportsDataService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.search(query))
    ).subscribe(
      (results) => {
        this.teamResults = results[0].teams;
        this.playerResults = results[1].player;
        console.log(this.playerResults);
        this.combineResults();
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }
  
  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  private search(query: string) {
    return forkJoin([
      this.sportsDataService.search(query),
      this.sportsDataService.searchPlayers(query)
    ]);
  }

  onResultClick(teamId: string) {
    this.router.navigate(['/team', teamId]);
  }

  onPlayerResultClick(playerId: string) {
    this.router.navigate(['/player', playerId]);
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  onSearchEnter() {
    this.showResults = false;
  }

  private combineResults = () => {
    this.searchResults = this.teamResults.concat(this.playerResults);
    this.showResults = this.searchResults.length > 0;
  }
}
