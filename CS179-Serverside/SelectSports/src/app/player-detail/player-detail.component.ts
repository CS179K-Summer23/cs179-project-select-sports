// player-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  playerId: string = '';
  playerDetails: any;

  constructor(
    private route: ActivatedRoute, 
    private sportsDataService: SportsDataService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerId = params['id'];
      this.fetchPlayerDetails();
    });
  }

  fetchPlayerDetails() {
    this.sportsDataService.getPlayerDetailsById(this.playerId)
      .subscribe(data => {
        this.playerDetails = data.players[0];
      });
  }
}
