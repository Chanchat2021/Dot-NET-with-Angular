import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { options } from 'src/assets/constants/cosntants';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../api-urls';
import { ITeam } from '../models/ITeam';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  user: string = '';
  constructor(private httpClient: HttpClient) {}
  getTeamList(eventId: number) {
    return this.httpClient.get<ITeam[]>(
      `${environment.BaseUrl}${apiUrl.getTeamList}/event/${eventId}`
    );
  }
  addTeamParticipant(data: {
    teamId: number;
    emailId: string;
  }): Observable<string> {
    return this.httpClient.post(
      `${environment.BaseUrl}${apiUrl.postTeamMember}`,
      data,
      options
    );
  }
  addTeam(data: {
    name: string;
    eventId: string;
    createdBy: string;
  }): Observable<string> {
    return this.httpClient.post(
      `${environment.BaseUrl}${apiUrl.getTeamList}`,
      data,
      options
    );
  }
}
