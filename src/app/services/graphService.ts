import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProfile } from '../models/IProfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private httpClient: HttpClient) {}

  getMyProfileImage(): Observable<Blob> {
    return this.httpClient.get(environment.GraphEndpoint + 'me/photo/$value', {
      responseType: 'blob',
    });
  }
  getMyInformation(): Observable<IProfile> {
    return this.httpClient.get<IProfile>(environment.GraphEndpoint + 'me');
  }
  getProfileImageByEmail(email: string): Observable<Blob> {
    return this.httpClient.get(
      environment.GraphEndpoint + `users/${email}/photo/$value`,
      { responseType: 'blob' }
    );
  }
  getUserInformationByEmail(email: string): Observable<IProfile> {
    return this.httpClient.get<IProfile>(
      environment.GraphEndpoint + `users/${email}`
    );
  }
}
