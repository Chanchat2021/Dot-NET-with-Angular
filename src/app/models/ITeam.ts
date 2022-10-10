import { SafeResourceUrl } from '@angular/platform-browser';

export interface ITeam {
  id: number;
  name: string;
  eventId: number;
  createdBy: string;
  createdDate: Date;
  image?: SafeResourceUrl;
  teamMembers: ITeamMember[];
}
export interface ITeamMember {
  id: number;
  teamId: number;
  emailId: string;
}
