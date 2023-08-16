import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFavsComponent } from './user-favs/user-favs.component';
import { HomepageComponent } from './homepage/homepage.component'; // Import the homepage component
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { DailyLoginComponent } from './daily-login/daily-login.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BetsComponent } from './bets/bets.component';
import { AuthGuard } from './auth/auth-guard.service';




const routes: Routes = [
  { path: '', component: HomepageComponent }, // Set the homepage as the default route
  {path: 'SignIn', component:LoginUserComponent},
  {path:'register', component:SignUpComponent},
  {path:'DailyLogin', component:DailyLoginComponent},
  {path:'profile', component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'profile', component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'favs', component:UserFavsComponent,canActivate:[AuthGuard]},
  {path:'profileEdit', component:UserProfileEditComponent,canActivate:[AuthGuard]},
  {path:'Bets', component:BetsComponent, canActivate:[AuthGuard]},
  { path: 'team/:id', component:  TeamDetailComponent},
  { path: 'player/:id', component:  PlayerDetailComponent},
  { path: 'soccer/:id', component: LeagueDetailComponent},
  { path: 'football/:id', component: LeagueDetailComponent},
  { path: 'baseball/:id', component: LeagueDetailComponent},
  { path: 'basketball/:id', component: LeagueDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
