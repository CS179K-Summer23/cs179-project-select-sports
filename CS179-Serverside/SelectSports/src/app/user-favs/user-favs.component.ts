import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-favs',
  templateUrl: './user-favs.component.html',
  styleUrls: ['./user-favs.component.css']
})
export class UserFavsComponent implements OnInit {
  favoriteTeams: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Fetch the user's favorite teams from backend
    // For this example, I'm using a static list of teams
    this.favoriteTeams = [
      { strTeam: 'Team 1' },
      { strTeam: 'Team 2' },
    ];
  }
}
