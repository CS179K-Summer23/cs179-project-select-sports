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
  upcomingGames: any[] = []; //Store upcoming events
  pastGames: any[] = []; //Store past 5 games

  constructor(
    private route: ActivatedRoute,
    private sportsDataService: SportsDataService
  ) {}

  ngOnInit(): void {
    // Get the team ID from the route parameters
    this.route.params.subscribe((params) => {
      const teamId = params['id'];

      // Fetch the team details using the api
      this.sportsDataService.getTeamDetails(teamId).subscribe(
        (team) => {
          this.team = team.teams[0];
        },
        (error) => {
          console.error('Error fetching team details:', error);
        }
      );

      this.sportsDataService.getUpcomingGames(teamId).subscribe(
        (upcomingGames) => {
          this.upcomingGames = upcomingGames.events;
        },
        (error) => {
          console.error('Error fetching upcoming games:', error);
        }
      );

      this.sportsDataService.getPastGames(teamId).subscribe(
        (pastGames) => {
          this.pastGames = pastGames.results.slice(0, 5);
        },
        (error) => {
          console.error('Error fetching past games:', error);
        }
      );
      
    });
  }
}
