import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service';

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
    if (this.searchQuery.trim() !== '') {
      this.sportsDataService.search(this.searchQuery).subscribe(
        (response) => {
          this.searchResults = response.teams;
          this.showResults = true;
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

  onResultClick(teamId: string) {
    this.router.navigate(['/team', teamId]);
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
