// league-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service';
import { NewsDataService } from '../Services/news-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit {
  leagueId: string = '';
  leagueDetails: any;
  leagueNextFifteen: any;
  leaguePastFifteen: any;
  leagueTable: any;
  leagueNews: any;
  leagueTeams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService
    ) { }

  navigateToTeam(teamId: string) {
    this.router.navigate(['/team', teamId]);
  }

  navigateToEvent(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const leagueId = params['id'];
      
      this.sportsDataService.getLeagueDetailsById(leagueId)
      .subscribe(data => {
        //console.log(data);
        this.leagueDetails = data.leagues[0];
        const leagueName = this.leagueDetails.strLeague;
        const thisSeason = this.leagueDetails.strCurrentSeason;
        
        this.fetchNextFifteen(leagueId);
        this.fetchLastFifteen(leagueId);
        this.fetchLeagueNews(leagueName);
        this.fetchLeagueStandings(leagueId, thisSeason);
        this.fetchLeagueTeams(leagueName);
      });
    });
  }

  fetchLeagueNews(leagueName: string) {
    this.newsDataService.getLeagueNews(leagueName).subscribe(
      (leagueNews) => {
        this.leagueNews = leagueNews.articles.slice(0, 5);
      }
    );
  }

  fetchNextFifteen(leagueId: string) {
    this.sportsDataService.getNextFifteen(leagueId).subscribe(
      (next) => {
        console.log(next.events.slice(0, 10));
        this.leagueNextFifteen = next.events.slice(0, 10);
      })
  }

  fetchLastFifteen(leagueId: string) {
    this.sportsDataService.getNextFifteen(leagueId).subscribe(
      (past) => {
        this.leaguePastFifteen = past.events.slice(0, 10);
      })
  }

  fetchLeagueStandings(leagueId: string, leagueYear: string) {
    this.sportsDataService.getLeagueTable(leagueId, leagueYear).subscribe(
      (table) => {
        //console.log(table);
        this.leagueTable = table.table;
      })
  }

  fetchLeagueTeams(leagueName: string) {
    this.sportsDataService.getLeagueTeams(leagueName).subscribe(
      (teams) => {
        this.leagueTeams = teams.teams;
        //console.log(this.leagueTeams);
      })
  }
}
