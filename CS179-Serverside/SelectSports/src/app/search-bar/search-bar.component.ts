import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SportsDataService } from '../sports-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  searchQuery: string = '';
  showResults: boolean = false;
  searchResults: any[] = [];

  constructor(private router: Router, private sportsDataService: SportsDataService) {}
  
  onSearchInput() {
    if (this.searchQuery.length > 0) {
      this.sportsDataService.searchTeams(this.searchQuery).subscribe(
        (results: any[]) => {
          this.searchResults = results;
          this.showResults = true;

          console.log(this.searchResults);
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  onResultClick(result: any) {
    this.router.navigate(['/result', result.id]);
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  onSearchEnter() {
    this.showResults = false;
  }
}
