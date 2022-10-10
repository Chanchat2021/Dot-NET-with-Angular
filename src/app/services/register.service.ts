import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { options } from 'src/assets/constants/cosntants';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../api-urls';
import { IRegister } from '../models/IRegister';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}
  registerEvent(data: IRegister): Observable<string> {
    return this.httpClient.post(
      `${environment.BaseUrl}${apiUrl.registration}`,
      data,
      options
    );
  }
  checkRegistration(data: IRegister): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${environment.BaseUrl}${apiUrl.registration}/event/${data.eventId}/user/${data.emailId}`
    );
  }
}
