import { GraphService } from '../../services/graphService';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ITeam } from 'src/app/models/ITeam';
import { TeamService } from 'src/app/services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css'],
})
export class JoinTeamComponent implements OnInit {
  teams: ITeam[] = [];
  user: string = '';
  displayStyle = 'none';
  teamMemberExist: boolean = false;
  isPartOfTeam: boolean = false;
  teamName: string = '';
  @Input() eventId: string = '';
  @Output() openCreateTeamModal = new EventEmitter<boolean>();
  constructor(
    private teamService: TeamService,
    private graphService: GraphService,
    private domSanitizer: DomSanitizer,
    private notifyService: NotificationService
  ) {}
  ngOnInit(): void {
    let loggedInUserEmail = localStorage.getItem('emailId');
    this.user = loggedInUserEmail == null ? '' : loggedInUserEmail;
    this.checkUserExists();
  }
  checkUserExists() {
    this.teams.forEach((team) => {
      team.teamMembers?.forEach((teamMember) => {
        if (
          parseInt(this.eventId) == team.eventId &&
          teamMember.emailId == this.user
        ) {
          this.teamMemberExist = true;
        }
      });
    });
  }
  addTeamMember(id: number, name: string) {
    let userData = { teamId: id, emailId: this.user };
    this.teamService.addTeamParticipant(userData).subscribe({
      next: () => {
        this.closePopup();
        this.teamName = name;
        this.notifyService.showSuccess(`You have joined the team: ${name}`);
        this.isPartOfTeam = true;
      },
      error(error: HttpErrorResponse) {
        throw error;
      },
    });
  }
  openPopup() {
    this.displayStyle = 'block';
    this.getTeamList(parseInt(this.eventId));
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  getProfilePic() {
    this.teams.map((team) => {
      this.graphService.getProfileImageByEmail(team.createdBy).subscribe({
        next: (res: Blob) => {
          var urlCreator = window.URL || window.webkitURL;
          window.URL.createObjectURL(res);
          team.image = this.domSanitizer.bypassSecurityTrustResourceUrl(
            urlCreator.createObjectURL(res)
          );
        },
        error(error: HttpErrorResponse) {
          throw error;
        },
      });
    });
  }
  getTeamList(eventId: number) {
    this.teamService.getTeamList(eventId).subscribe({
      next: (res: ITeam[]) => {
        this.teams = res;
        this.getProfilePic();
      },
      error(error: HttpErrorResponse) {
        throw error;
      },
    });
  }
  checkIfTeamMemberExists() {
    if (this.isPartOfTeam == true)
      this.notifyService.showWarning(
        `You have already joined team : ${this.teamName}`
      );
    this.closePopup();
  }
  openTeamPopup() {
    this.closePopup();
    this.openCreateTeamModal.emit(true);
  }
}
