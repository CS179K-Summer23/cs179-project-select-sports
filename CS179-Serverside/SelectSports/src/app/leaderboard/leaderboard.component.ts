import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Input() leaderboardType: string = 'Highest Current Total Points';
  @Input() users: any[] = [];
  leaderboardUsers: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('Leaderboard Component Initialized');
    this.loadLeaderboardUsers();
  }
  
  loadLeaderboardUsers(): void {
    this.userService.getUsersData().subscribe(
      (usersData: any[]) => {
        this.users = usersData;
        this.calculateLeaderboardUsers();
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  getPointsByLeaderboardType(user: any): number {
    switch (this.leaderboardType) {
      case 'Highest Current Total Points':
        return user.points;
      case 'Highest All-Time Total Points':
        return user.allTimeEarnedPoints;
      case 'Most Lost All-Time Total Points':
        return user.allTimeLostPoints;
      default:
        return 0;
    }
  }

  calculateLeaderboardUsers(): void {
    switch (this.leaderboardType) {
      case 'Highest Current Total Points':
        this.leaderboardUsers = this.users.slice().sort((a, b) => b.points - a.points);
        break;
      case 'Highest All-Time Total Points':
        this.leaderboardUsers = this.users.slice().sort((a, b) => b.allTimeEarnedPoints - a.allTimeEarnedPoints);
        break;
      case 'Most Lost All-Time Total Points':
        this.leaderboardUsers = this.users.slice().sort((a, b) => b.allTimeLostPoints - a.allTimeLostPoints);
        break;
      default:
        this.leaderboardUsers = [];
        break;
    }
  }
}
