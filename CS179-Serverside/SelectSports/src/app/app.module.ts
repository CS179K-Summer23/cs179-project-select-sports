import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthService } from './Services/auth.service';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';

import { FilterLeaguePipe } from './Services/filter-league.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

import { FilterLeaguePipe } from './filter-league.pipe';
import { BetsComponent } from './bets/bets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginUserComponent,
    SignUpComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    HomepageComponent,
    FilterLeaguePipe,

    SearchBarComponent,
    SearchResultComponent,
    TeamDetailComponent,
    LeagueDetailComponent,
    PlayerDetailComponent,

    BetsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    ReactiveFormsModule,
    RouterModule

ReactiveFormsModule,
BrowserAnimationsModule,
NgxSpinnerModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
