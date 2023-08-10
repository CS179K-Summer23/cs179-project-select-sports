import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsDataService } from '../sports-data.service';
import { NewsDataService } from '../news-data.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
})
export class TeamDetailComponent implements OnInit {
  team: any; // Store the team details
  upcomingGames: any[] = []; // Store upcoming events
  pastGames: any[] = []; // Store past 5 games
  teamNews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService
  ) {}

  ngOnInit(): void {
    // Get the team ID from the route parameters
    this.route.params.subscribe((params) => {
      const teamId = params['id'];

      // Fetch the team details using thesportsdb api to get the team name
      this.sportsDataService.getTeamDetails(teamId).subscribe(
        (team) => {
          // Extract the team name from the team details
          const teamName = team.teams[0].strTeam;

          // Assign the team details
          this.team = team.teams[0];

          // Fetch upcoming games, past games, and team-specific news
          this.fetchUpcomingGames(teamId);
          this.fetchPastGames(teamId);
          this.fetchTeamNews(teamName);
        },
        (error) => {
          console.error('Error fetching team details:', error);
        }
      );
    });
  }

  // Fetch upcoming games
  fetchUpcomingGames(teamId: string) {
    this.sportsDataService.getUpcomingGames(teamId).subscribe(
      (upcomingGames) => {
        this.upcomingGames = upcomingGames.events;
      },
      (error) => {
        console.error('Error fetching upcoming games:', error);
      }
    );
  }

  // Fetch past games
  fetchPastGames(teamId: string) {
    this.sportsDataService.getPastGames(teamId).subscribe(
      (pastGames) => {
        this.pastGames = pastGames.results.slice(0, 5);
      },
      (error) => {
        console.error('Error fetching past games:', error);
      }
    );
  }

  // Fetch team-specific news
  fetchTeamNews(teamName: string) {
    this.newsDataService.getTeamNews(teamName).subscribe(
      (teamNews) => {
        this.teamNews = teamNews.articles;
      },
      (error) => {
        console.error('Error fetching team news:', error);
      }
    );
  }

}
