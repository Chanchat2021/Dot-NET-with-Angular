import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/api-urls';
import { IEventForm } from 'src/app/models/IEventForm';
import { options } from 'src/assets/constants/cosntants';
import { environment } from 'src/environments/environment';
import { IEventDetails } from '../models/IEventDetails';
import { IUpcomingEvents } from '../models/IUpcoming';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}
  createEvent(data: IEventForm): Observable<string> {
    var url = `${environment.BaseUrl}${apiUrl.createEvent}`;
    return this.httpClient.post(url, data, options);
  }
  getUpcomingEvents(): Observable<IUpcomingEvents[]> {
    return this.httpClient.get<IUpcomingEvents[]>(
      `${environment.BaseUrl}${apiUrl.getUpcomingEvents}`
    );
  }
  getEventDetails(id: string) {
    return this.httpClient.get<IEventDetails>(`${environment.BaseUrl}${apiUrl.getAllEvents}/${id}`)
  }
  getBanner(id:string){
    return this.httpClient.get<IUpcomingEvents>(
      `${environment.BaseUrl}${apiUrl.banner}${id}`
    )
  }
}
