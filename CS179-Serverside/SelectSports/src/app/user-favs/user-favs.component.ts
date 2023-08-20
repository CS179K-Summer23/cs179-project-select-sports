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
  teamDetails: any[] = [];
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


  getTeamDetails(teamId: string) {
    this.sportsDataService.getTeamDetails(teamId).subscribe(
      (team) => {
        this.teamDetails.push(team.teams[0]);
        
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
          }
        }
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
  

  logout() {
    localStorage.clear();
    this.auth.SetLoggedOut();
    this.router.navigate(['/SignIn']);
  }
}
