import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FilterLeaguePipe } from './filter-league.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
