import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsDataService } from '../sports-data.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
})
export class TeamDetailComponent implements OnInit {
  team: any; // Store the team details

  constructor(
    private route: ActivatedRoute,
    private sportsDataService: SportsDataService
  ) {}

  ngOnInit(): void {
    // Get the team ID from the route parameters
    this.route.params.subscribe((params) => {
      const teamId = params['id'];

      // Fetch the team details using the service
      this.sportsDataService.getTeamDetails(teamId).subscribe(
        (team) => {
          this.team = team.teams[0]; // Assuming the API response has a 'teams' property
        },
        (error) => {
          console.error('Error fetching team details:', error);
        }
      );
    });
  }
}
