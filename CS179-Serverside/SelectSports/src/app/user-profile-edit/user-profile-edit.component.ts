import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})

export class UserProfileEditComponent implements OnInit{
  userForm = { favorite_sport: '',  description: ''};

  constructor(private formBuilder:FormBuilder, private auth:AuthService, private router: Router){
 
}

  ngOnInit(): void {
      
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
