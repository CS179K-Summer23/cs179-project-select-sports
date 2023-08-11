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
  player: any;

  constructor(
    private route: ActivatedRoute, 
    private sportsDataService: SportsDataService
    ) { }

    ngOnInit(): void {
      // Get the player ID from the route parameters
      this.route.params.subscribe(params => {
        const playerId = params['id'];
  
        // Fetch the player details using the API
        this.sportsDataService.getPlayerDetails(playerId).subscribe(
          (player) => {
            // Assign the player details
            this.player = player.players[0];
          },
          (error) => {
            console.error('Error fetching player details:', error);
          }
        );
      });
    }
}
