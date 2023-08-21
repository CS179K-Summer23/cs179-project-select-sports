import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SportsDataService } from '../Services/sports-data.service'; 
import { NewsDataService } from '../Services/news-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {
  eventDetails: any;
  stats: any;
  lineup: any;
  timeline: any;
  tv: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportsDataService: SportsDataService,
    private newsDataService: NewsDataService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const eventId = params['id'];

      this.sportsDataService.getEventDetails(eventId).subscribe(
        (event) => {
          this.eventDetails = event.events[0];
          console.log(this.eventDetails);
        }
      );

      this.fetchEventStats(eventId);
      this.fetchEventLineup(eventId);
      this.fetchEventTimeline(eventId);
      this.fetchEventTV(eventId);
    }); 
  }

  fetchEventStats(eventId: string) {
    this.sportsDataService.getEventStatistics(eventId).subscribe(
      (stats) => {
        this.stats = stats.eventstats;
        console.log(this.stats);
      },
      (error) => {
        console.error('Error fetching event stats:', error);
      }
    );
  }

  fetchEventLineup(eventId: string) {
    this.sportsDataService.getEventLineup(eventId).subscribe(
      (lineup) => {
        this.lineup = lineup.lineup;
        console.log(this.lineup);
      },
      (error) => {
        console.error('Error fetching event lineup:', error);
      }
    );
  }

  fetchEventTimeline(eventId: string) {
    this.sportsDataService.getEventTimeline(eventId).subscribe(
      (timeline) => {
        this.timeline = timeline.timeline;
        console.log(this.timeline);
      },
      (error) => {
        console.error('Error fetching event timeline:', error);
      }
    );
  }

  fetchEventTV(eventId: string) {
    this.sportsDataService.getEventTV(eventId).subscribe(
      (tv) => {
        this.tv = tv.tvevent;
        //console.log(this.tv);
      },
      (error) => {
        console.error('Error fetching event tv:', error);
      }
    );
  }

}
