import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})

export class UserProfileEditComponent implements OnInit{
  userForm = { email: '', favorite_sport: '',  description: ''};

  constructor(private formBuilder:FormBuilder, private auth:AuthService, private router: Router){
}

  ngOnInit(): void {
    const currentUser = history.state.user;
    if (currentUser) {
      this.userForm.email = currentUser.email;
      this.userForm.favorite_sport = currentUser.favorite_sport;
      this.userForm.description = currentUser.description;
    }
  }

  back() {
    this.router.navigate(['/profile']);
  }

  profileEdit() {
    this.auth.profileEdit(this.userForm).subscribe(
    res=>{
      alert("Account information updated");
    }, err=>{    
      }
   )
  }

}
