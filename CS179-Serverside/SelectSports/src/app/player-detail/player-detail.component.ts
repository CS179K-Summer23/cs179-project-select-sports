// player-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service';
import { NewsDataService } from '../Services/news-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  playerId: string = '';
  player: any;
  honors: any;
  milestones: any;
  teams:  any;
  contracts: any;
  playerNews: any[] = [];
  nextGames: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService
    ) { }

    navigateToEvent(eventId: string) {
      this.router.navigate(['/event', eventId]);
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        const playerId = params['id'];

        this.sportsDataService.getPlayerDetails(playerId).subscribe(
          (player) => {
            console.log(player);
            const playerName = player.players[0].strPlayer;
            const teamId = player.players[0].idTeam;
            this.player = player.players[0];

            this.fetchPlayerHonors(playerId);
            this.fetchPlayerMilestones(playerId);
            this.fetchPlayerTeams(playerId);
            this.fetchPlayerContracts(playerId);
            this.fetchPlayerNews(playerName);
            this.fetchSchedule(teamId);
          }
        );
      });
    }

    fetchSchedule(teamId: string) {
      this.sportsDataService.getUpcomingGames(teamId).subscribe(
        (sched) => {
          this.nextGames = sched.events;
        }
      );
    }

    fetchPlayerHonors(playerId: string) {
      this.sportsDataService.getPlayerHonors(playerId).subscribe(
        (honors) => {
          //console.log(honors);
          this.honors = honors.honours;
        }
      );
    }

    fetchPlayerMilestones(playerId: string) {
      this.sportsDataService.getPlayerMilestones(playerId).subscribe(
        (milestones) => {
          //console.log(milestones);
          this.milestones = milestones.milestones;
        }
      );
    }

    fetchPlayerTeams(playerId: string)  {
      this.sportsDataService.getPlayerTeams(playerId).subscribe(
        (teams) => {
          //console.log(teams);
          this.teams = teams.formerteams;
        }
      );
    }

    fetchPlayerContracts(playerId: string) {
      this.sportsDataService.getPlayerContracts(playerId).subscribe(
        (contracts) => {
          //console.log(contracts);
          this.contracts = contracts.contracts;
        }
      );
    }

    fetchPlayerNews(playerName: string) {
      this.newsDataService.getTeamNews(playerName).subscribe(
        (news) => {
          this.playerNews = news.articles;
        }
      );
    }
}
