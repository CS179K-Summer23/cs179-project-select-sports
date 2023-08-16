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
  leagueYear: string = '2023-2024';
  leagueNews: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService
    ) { }

  navigateToTeam(teamId: string) {
    this.router.navigate(['/team', teamId]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const leagueId = params['id'];
      
      this.sportsDataService.getLeagueDetailsById(leagueId)
      .subscribe(data => {
        console.log(data);
        this.leagueDetails = data.leagues[0];
        const leagueName = this.leagueDetails.strLeague;
        const thisSeason = this.leagueDetails.strCurrentSeason;
        
        this.fetchNextFifteen(leagueId);
        this.fetchLastFifteen(leagueId);
        this.fetchLeagueNews(leagueName);
        this.fetchLeagueStandings(leagueId, thisSeason);
      });

     
    });
  }

  fetchLeagueNews(leagueName: string) {
    this.newsDataService.getLeagueNews(leagueName).subscribe(
      (leagueNews) => {
        console.log(leagueNews);
        this.leagueNews = leagueNews.articles.slice(0, 5);
      }
    );
  }

  fetchNextFifteen(leagueId: string) {
    this.sportsDataService.getNextFifteen(leagueId).subscribe(
      (next) => {
        console.log(next);
        this.leagueNextFifteen = next.events.slice(0, 10);
      })
  }

  fetchLastFifteen(leagueId: string) {
    this.sportsDataService.getNextFifteen(leagueId).subscribe(
      (past) => {
        console.log(past);
        this.leaguePastFifteen = past.events.slice(0, 10);
      })
  }

  fetchLeagueStandings(leagueId: string, leagueYear: string) {
    this.sportsDataService.getLeagueTable(leagueId, leagueYear).subscribe(
      (table) => {
        console.log(table);
        this.leagueTable = table.table;
      })
  }
}
