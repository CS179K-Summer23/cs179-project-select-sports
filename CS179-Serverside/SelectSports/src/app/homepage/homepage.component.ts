import { Component, OnInit } from '@angular/core';
import { NewsDataService } from '../news-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  news: any[] = [];

  constructor(private newsDataService: NewsDataService) { }

  ngOnInit(): void {
    this.fetchLatestAmericanSportsNews();
  }

  fetchLatestAmericanSportsNews() {
    this.newsDataService.getLatestAmericanSportsNews().subscribe(
      (data: any) => {
        this.news = data.articles;
      },
      (error) => {
        console.log('Error fetching American sports news', error);
      }
    );
  }
}
