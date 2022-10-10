import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEventDetails } from 'src/app/models/IEventDetails';
import { RegisterService } from 'src/app/services/register.service';
import { ITeam } from 'src/app/models/ITeam';
import { EventService } from 'src/app/services/event.service';
import { IBanner } from 'src/app/models/IBanner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  eventDetails!: IEventDetails;
  banner!: IBanner;
  id: string = '';
  teams: ITeam[] = [];
  user: string = '';
  register: boolean = false;
  openCreateModal: boolean = false;
  constructor(
    private eventService: EventService,
    private serviceUpcoming: EventService,
    private route: ActivatedRoute,
    private registerService: RegisterService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: string }) => {
      this.id = params['id'];
      let loggedInUserEmail = localStorage.getItem('emailId');
      this.user = loggedInUserEmail == null ? '' : loggedInUserEmail;
      this.eventService.getEventDetails(this.id).subscribe({
        next: (res: IEventDetails) => {
          this.eventDetails = res;
          this.teams = res.teams;
        },
      });
      this.getEventData(this.id);
    });
    this.checkRegistration();
    this.serviceUpcoming.getBanner(this.id).subscribe({
      next: (res) => {
        this.banner = res;
      }
    })
  }
  checkRegistration() {
    let userData = { eventId: parseInt(this.id), emailId: this.user };
    this.registerService.checkRegistration(userData).subscribe({
      next: (res: boolean) => {
        this.register = res;
      },
      error(error: HttpErrorResponse) {
        throw error;
      },
    });
  }
  getEventData(id: string) {
    this.eventService.getEventDetails(id).subscribe({
      next: (res: IEventDetails) => {
        this.eventDetails = res;
        this.teams = res.teams;
      },
      error(error: HttpErrorResponse) {
        throw error;
      },
    });
  }
  createTeamModal($event: boolean) {
    this.openCreateModal = $event;
  }
}
