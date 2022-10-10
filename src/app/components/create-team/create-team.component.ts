
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
import { IEventDetails } from 'src/app/models/IEventDetails';
import { NotificationService } from 'src/app/services/notification.service';
import { ITeam } from 'src/app/models/ITeam';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {
  user: string = '';
  displayStyle = 'none';
  reactiveForm: any;
  teamName: string = '';
  teamNameExists: boolean = false;
  @Input() eventId: string = '';
  @Input() teamList: ITeam[] = [];
  @Input() isModalOpen:boolean=false;
  @Output() openCreateTeamModal=new EventEmitter<boolean>();
  constructor(
    private teamService: TeamService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    let loggedInUserEmail = localStorage.getItem('emailId');
    this.user = loggedInUserEmail == null ? '' : loggedInUserEmail;
    this.reactiveForm = new FormGroup({
      teamName: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.required,
      ]),
    });
  }
  closePopup() {

    this.openCreateTeamModal.emit(false)
  }
  addTeam() {
    if (this.teamNameExists == false) {
      let userData = {
        name: this.teamName,
        eventId: this.eventId,
        createdBy: this.user,
      };
      this.teamService.addTeam(userData).subscribe({
        next: (res) => {
          this.notifyService.showSuccess(
            `You Have created the team: ${this.teamName}`
          );
          this.closePopup();
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }
  checkTeamExists() {
    this.teamName = this.reactiveForm.controls['teamName'].value;
    const userTeamName=this.teamList.filter((x)=>x.name==this.teamName)
    if(userTeamName.length>=1)
    {
      this.teamNameExists = true;
    }
    else 
    {
      this.teamNameExists = false;
    }
  }
}
