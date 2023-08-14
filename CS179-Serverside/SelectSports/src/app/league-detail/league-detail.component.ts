// league-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit {
  leagueId: string = '';
  leagueDetails: any; 

  constructor(
    private route: ActivatedRoute, 
    private sportsDataService: SportsDataService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params['id'];
      this.fetchLeagueDetails();
    });
  }

  fetchLeagueDetails() {
    this.sportsDataService.getLeagueDetailsById(this.leagueId)
      .subscribe(data => {
        console.log(data);
        this.leagueDetails = data.leagues[0];
      });
  }
}
