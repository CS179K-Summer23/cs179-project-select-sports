import { Component, OnInit } from '@angular/core';
import { NewsDataService } from '../Services/news-data.service';
import { SportsDataService } from '../Services/sports-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

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
    private sportsDataService: SportsDataService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  navigateToEvent(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  currentLeaderboardData: any[] = [];
  usersData: any[] = [];
  leaderboardTypes = [
    'Highest Current Total Points',
    'Highest All-Time Total Points',
    'Most Lost All-Time Total Points'
  ];
  currentLeaderboardIndex = 0;
  
  highestCurrentPointsUsers: any[] = [];
  highestAllTimePointsUsers: any[] = [];
  mostLostAllTimePointsUsers: any[] = []; 

  switchLeaderboard(index: number) {
    console.log('Switch leaderboard called with index:', index);
    this.currentLeaderboardIndex = index;
    this.fetchLeaderboardData();
  }

  ngOnInit(): void {
    this.fetchTopAmericanSportsNews();
    this.fetchScores();
    this.startLeaderboardCycling();
    this.fetchLeaderboardData();

    this.userService.getUsersData('allUsers').subscribe(
      (data: any[]) => {
        this.usersData = data;
      },
      (error) => {
        console.log('Error fetching users data', error);
      }
    );

    this.fetchLeaderboardUsers();

    setInterval(() => {
      this.switchToNextLeaderboard();
    }, 20000);
  }

  startLeaderboardCycling() {
    this.switchToNextLeaderboard();
  }

  switchToNextLeaderboard() {
    this.currentLeaderboardIndex = (this.currentLeaderboardIndex + 1) % this.leaderboardTypes.length;
    setTimeout(() => {
      this.fetchLeaderboardData();
    });
  }  

  fetchLeaderboardUsers() {
    this.userService.getUsersData().subscribe((data: any[]) => {
      this.highestCurrentPointsUsers = data.slice().sort((a, b) => b.points - a.points);
      this.highestAllTimePointsUsers = data.slice().sort((a, b) => b.allTimeEarnedPoints - a.allTimeEarnedPoints);
      this.mostLostAllTimePointsUsers = data.slice().sort((a, b) => b.allTimeLostPoints - a.allTimeLostPoints);
    });
  }

  fetchLeaderboardData() {
    const currentLeaderboardType = this.leaderboardTypes[this.currentLeaderboardIndex];
    switch (currentLeaderboardType) {
      case 'Highest Current Total Points':
        this.userService.getHighestCurrentPointsLeaderboard().subscribe((data: any[]) => {
          console.log('Fetched Highest Current Points Leaderboard:', data);
          this.currentLeaderboardData = data;
        });
        break;
      case 'Highest All-Time Total Points':
        this.currentLeaderboardData = this.highestAllTimePointsUsers;
        break;
      case 'Most Lost All-Time Total Points':
        this.currentLeaderboardData = this.mostLostAllTimePointsUsers;
        break;
      default:
        this.currentLeaderboardData = [];
        break;
    }
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
