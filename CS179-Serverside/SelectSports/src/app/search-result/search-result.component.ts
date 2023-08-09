import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const resultId = params['id'];
      // Fetch data based on resultId and display it
    });
  }
}
