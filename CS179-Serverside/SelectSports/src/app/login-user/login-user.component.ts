import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  userForm = { email: '', password: '' };
  
constructor(private formBuilder:FormBuilder, private auth:AuthService, private router:Router){

}

ngOnInit(): void {

}
Login(){
  
  this.auth.login(this.userForm).subscribe(res => {
    if(res.success){
      localStorage.setItem('token',res.token);
     this.router.navigate(['/profile']);
      
    }else{
      alert(res.message)
    }
  }, err=>{
    alert("Login Unsuccessful");
  })
  


}




}



