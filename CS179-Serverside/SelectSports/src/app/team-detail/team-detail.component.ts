import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service'; 
import { NewsDataService } from '../Services/news-data.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
})
export class TeamDetailComponent implements OnInit {
  team: any; // Store the team details
  players: any[] = []; // Store the team's players
  upcomingGames: any[] = []; // Store upcoming events
  pastGames: any[] = []; // Store past 5 games
  teamNews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService
  ) {}

  navigateToPlayer(playerId: string) {
    this.router.navigate(['/player', playerId]);
  }

  addToFavorites(team: any) {
    console.log('Added to favorites:', team.strTeam);
    alert(`${team.strTeam} has been added to your favorites.`);
  }

  ngOnInit(): void {
    // Get the team ID from the route parameters
    this.route.params.subscribe((params) => {
      const teamId = params['id'];

      // Fetch the team details using the api to get the team name
      this.sportsDataService.getTeamDetails(teamId).subscribe(
        (team) => {
          // Extract the team name from the team details
          const teamName = team.teams[0].strTeam;

          // Assign the team details
          this.team = team.teams[0];

          // Fetch upcoming games, past games, team news, and team players
          this.fetchUpcomingGames(teamId);
          this.fetchPastGames(teamId);
          this.fetchTeamNews(teamName);
          this.fetchTeamPlayers(teamId);
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

  // Fetch the team's players
  fetchTeamPlayers(teamId: string) {
    this.sportsDataService.getTeamPlayers(teamId).subscribe(
      (players) => {
        this.players = players.player;
      },
      (error) => {
        console.error('Error fetching team players:', error);
      }
    );
  }
}
