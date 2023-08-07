import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UserProfileEditComponent} from './user-profile-edit/user-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'SignIn', component:LoginUserComponent},
  {path:'register', component:SignUpComponent},
  {path:'profile', component:UserProfileComponent},
  {path:'profileEdit', component:UserProfileEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
