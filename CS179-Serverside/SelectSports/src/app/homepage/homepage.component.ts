import { Component, OnInit } from '@angular/core';
import { NewsDataService } from '../news-data.service';
import { SportsDataService } from '../sports-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  topAmericanSportsNews: any[] = [];
  scores: any[] = [];
  leagueIds = ['4387', '4391', '4424']; // NBA, NFL, and MLB league IDs

  constructor(
    private newsDataService: NewsDataService,
    private sportsDataService: SportsDataService
  ) { }

  ngOnInit(): void {
    this.fetchTopAmericanSportsNews();
    this.fetchScores();
  }

  fetchTopAmericanSportsNews() {
    this.newsDataService.getTopAmericanSportsNews().subscribe(
      (data: any) => {
        this.topAmericanSportsNews = data.articles;
      },
      (error) => {
        console.log('Error fetching top American sports news', error);
      }
    );
  }

  fetchScores() {
    this.sportsDataService.getScoresByLeagues(this.leagueIds).subscribe(
      (data: any[]) => {
        // Flatten the scores array and sort them by date in descending order
        this.scores = data.flatMap(scores => scores.events);
        this.scores.sort((scoreA: any, scoreB: any) => {
          const dateA = new Date(scoreA.dateEvent).getTime();
          const dateB = new Date(scoreB.dateEvent).getTime();
          return dateB - dateA;
        });

        // Take only the latest 5 scores for each league
        const latestScores: any[] = [];
        const scoresByLeague: { [key: string]: number } = {};
        for (const score of this.scores) {
          if (!scoresByLeague[score.strLeague]) {
            scoresByLeague[score.strLeague] = 0;
          }
          if (scoresByLeague[score.strLeague] < 5) {
            latestScores.push(score);
            scoresByLeague[score.strLeague]++;
          }
        }
        this.scores = latestScores;
      },
      (error) => {
        console.log('Error fetching scores', error);
      }
    );
  }
}
