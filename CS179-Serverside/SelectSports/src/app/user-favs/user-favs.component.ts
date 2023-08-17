import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-favs',
  templateUrl: './user-favs.component.html',
  styleUrls: ['./user-favs.component.css']
})
export class UserFavsComponent implements OnInit {
  favoriteTeamIds: any;
  data: any;

  constructor(
    private auth: AuthService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.profile();
    // Fetch the user's favorite teams from backend
    // For this example, I'm using a static list of teams
    
  }

  profile() {
    this.auth.profile().subscribe(
      (result) => {
        if (result.success) {
          this.data = result.data;
          this.getTeams(this.data.email);
          console.log(this.data.email);
        } 
        else {
          this.logout();
        }
      }
    );
  }

  getTeams(userEmail: string) {
    this.auth.getFavTeams(userEmail).subscribe(
      (teamIds) => {
        if (teamIds.success) {
          this.favoriteTeamIds = teamIds.data;
          console.log("Favorite Team IDs:", this.favoriteTeamIds);
        }
      }
    );
  }
  

  logout() {
    localStorage.clear();
    this.auth.SetLoggedOut();
    this.router.navigate(['/SignIn']);
  }
}
