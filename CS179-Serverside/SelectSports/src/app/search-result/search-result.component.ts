import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() result: any; // Input property to receive search result data

  constructor(private router: Router) {}

  navigateToTeamDetail() {
    this.router.navigate(['/team', this.result.idTeam]);
  }
}
