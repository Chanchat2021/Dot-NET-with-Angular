import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from 'src/app/models/ITeam';
import { NotificationService } from 'src/app/services/notification.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: string = '';
  id: string = '';
  register: boolean = false;
  @Input() eventId: string = '';
  @Input() teams: ITeam[] = [];
  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private notifyService: NotificationService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: string }) => {
      this.id = params['id'];
      let loggedInUserEmail = localStorage.getItem('emailId');
      this.user = loggedInUserEmail == null ? '' : loggedInUserEmail;
    });
    this.checkRegistration();
  }
  registerToEvent() {
    let userData = { eventId: parseInt(this.id), emailId: this.user };
    this.registerService.registerEvent(userData).subscribe({
      next: () => {
        this.notifyService.showSuccess(
          'You are successfully registered to this event!'
        );
        this.register = true;
      },
      error(error: HttpErrorResponse) {
        throw error;
      },
    });
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
  displayRegistered() {
    if ((this.register = true))
      this.notifyService.showWarning(
        'You are already registered for this event'
      );
  }
}
