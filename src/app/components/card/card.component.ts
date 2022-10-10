import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBanner } from 'src/app/models/IBanner';
import { IUpcomingEvents } from 'src/app/models/IUpcoming';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() event!: IUpcomingEvents;
  banner!:IBanner;

  constructor(private router: Router,private service:EventService) {}

  ngOnInit(): void {
    this.service.getBanner(this.event.id.toString()).subscribe({
      next: (res) => {
        this.banner=res;
      },
    })
  }
  register() {}
  navigate(id: number) {
    this.router.navigate(['event-details', { id }]);
  }
}
