import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
data! : any;

constructor(private auth:AuthService, private router:Router){

}

ngOnInit(): void {
    this.profile();
}
profile(){
  this.auth.profile().subscribe((res) => {

     if(res.success){
      this.data = res.data;
       
     }else{
      this.logout();
     }
    },err=>{ }


)};

logout(){
  localStorage.clear();
  this.router.navigate(['/SignIn']);
}

}
