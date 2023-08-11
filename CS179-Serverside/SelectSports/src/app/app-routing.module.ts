import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'SignIn', component: LoginUserComponent},
  { path:'register', component: SignUpComponent},
  { path:'profile', component: UserProfileComponent},
  { path:'profileEdit', component: UserProfileEditComponent},
  { path: 'team/:id', component:  TeamDetailComponent},
  { path: 'player/:id', component:  PlayerDetailComponent},
  { path: 'soccer/:id', component: LeagueDetailComponent},
  { path: 'football/:id', component: LeagueDetailComponent},
  { path: 'baseball/:id', component: LeagueDetailComponent},
  { path: 'basketball/:id', component: LeagueDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
