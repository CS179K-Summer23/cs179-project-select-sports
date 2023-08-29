import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit{
  currentPage = 0;
  itemsPerPage = 10;
  @Input() data: { pointsinfo: string[] } = { pointsinfo: [] };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.RecordTable();
  }

  back_to_profile() {  
    this.router.navigate(['/profile']);
  }

  getDisplayedPointsInfo(): string[] {
    const reversedPointsInfo = this.data.pointsinfo.slice().reverse();
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return reversedPointsInfo.slice(startIndex, endIndex);
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.data.pointsinfo.length / this.itemsPerPage);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.data.pointsinfo.length / this.itemsPerPage);
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
