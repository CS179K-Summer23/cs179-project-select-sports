import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service'; 
import { NewsDataService } from '../Services/news-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-user-favs',
  templateUrl: './user-favs.component.html',
  styleUrls: ['./user-favs.component.css']
})
export class UserFavsComponent implements OnInit {
  favoriteTeamIds: any[] = [];
  teamSchedules: any[] = [];
  pastGames: any[] = [];
  teamDetails: any[] = [];
  teamNews: any[] = [];
  teamNames: any[] = [];
  data: any;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService,
    private auth: AuthService
    ) {}
  
    navigateToEvent(eventId: string) {
      this.router.navigate(['/event', eventId]);
    }

    navigateToTeam(teamId: string) {
      this.router.navigate(['/team', teamId]);
    }

    ngOnInit(): void {
      this.auth.profile().subscribe(
        (result) => {
          if (result.success) {
            this.data = result.data;
            this.getTeams(this.data.email);
  
          } 
          else {
            this.logout();
          }
        }
      );    
    }

  getTeams(userEmail: string) {
    this.auth.getFavTeams(userEmail).subscribe(
      (teamIds) => {
        if (teamIds.success) {
          this.favoriteTeamIds = teamIds.data;
          for (const teamId of this.favoriteTeamIds) {
            this.getTeamDetails(teamId);
            this.getNextGames(teamId);
            this.getPastGames(teamId);
          }
        }
      }
    );
  }

  getTeamDetails(teamId: string) {
    this.sportsDataService.getTeamDetails(teamId).subscribe(
      (team) => {
        this.teamDetails.push(team.teams[0]);
        this.getTeamNews(team.teams[0].strTeam);
      }
    );
  }

  getNextGames(teamId: string) {
    this.sportsDataService.getUpcomingGames(teamId).subscribe(
      (sched) => {
        sched = sched.events;
        this.teamSchedules.push(sched[0]);
      }
    );
  }

  getPastGames(teamId: string) {
    this.sportsDataService.getPastGames(teamId).subscribe(
      (past) => {
        this.pastGames.push(past.results[0]);
      }
    );
  }
  

  logout() {
    localStorage.clear();
    this.auth.SetLoggedOut();
    this.router.navigate(['/SignIn']);
  }

  getTeamNews(teamName: string) {
    this.newsDataService.getTeamNews(teamName).subscribe(
      (news) => {
        this.teamNews.push(news.articles.slice(0, 1)[0]);
        console.log(this.teamNews);
      },
      (error) => {
        console.error('Error fetching team news:', error);
      }
    );
  }
}
