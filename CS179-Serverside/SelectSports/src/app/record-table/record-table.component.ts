import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit{
  data: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.RecordTable();
  }

  back_to_profile() {  
    this.router.navigate(['/profile']);
  }

  RecordTable() {
    this.auth.RecordTable().subscribe(
      (res) => {
        if (res.success) {
          this.data = res.data;
        } else {
          
        }
      },
      (err) => {}
    );
  }
}
