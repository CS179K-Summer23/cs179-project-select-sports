import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  //to collect form data from html
  userForm = { name: '', email: '', password: '' };

  constructor(private formBuilder:FormBuilder, private auth:AuthService){
 
}

  ngOnInit(): void {
      
  }

  register(){
    
    
   this.auth.register(this.userForm).subscribe(
    res=>{
      alert("New Account has been Added");
    }, err=>{
        
        
      }
   )
  }
}
