import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IFilterLocation, IFilterPrice } from 'src/app/models/IFilter';
import { IUpcomingEvents } from 'src/app/models/IUpcoming';
import { EventService } from 'src/app/services/event.service';
import { IBanner } from 'src/app/models/IBanner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements DoCheck, OnInit {
  receivedData!: IUpcomingEvents[];
  IsLoggedIn: boolean = false;
  filterLocation: IFilterLocation[] = [];
  filterPrice: IFilterPrice[] = [];
  isFilterDeleted: boolean = false;
  filteredData: IUpcomingEvents[] = [];
  banner!:IBanner;
  id:string='';
  activeEvents:IUpcomingEvents[]=[];
  constructor(
    private serviceUpcoming: EventService,
    private service: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.serviceUpcoming.getUpcomingEvents().subscribe({
      next: (response: IUpcomingEvents[]) => {
        for (let res of response){
          if (res.deletedDate==null){
            this.activeEvents.push(res)
          }
        }
        this.receivedData = this.activeEvents;
        this.filteredData = this.activeEvents;
      },
      error(error: HttpErrorResponse) {
        throw error
      },
    });
  }

  ngDoCheck(): void {
    this.IsLoggedIn = this.isLoggedIn();
  }
  isLoggedIn() {
    return this.service.isLoggedIn();
  }
  locationFilter(id: number) {
    this.filteredData = [];
    this.filterLocation?.forEach((element) => {
      if (element?.id === id) {
        const pos = this.filterLocation?.indexOf(element);
        this.filterLocation.splice(pos, 1);
        this.isFilterDeleted = true;
      }
    });
    if (this.isFilterDeleted === false) {
      switch (id) {
        case 1:
          const bangaloreLoc = { id: 1, loc: 'Bangalore' };
          this.filterLocation.push(bangaloreLoc);
          break;
        case 2:
          const hyderabadLoc = { id: 2, loc: 'Hyderabad' };
          this.filterLocation.push(hyderabadLoc);
          break;
        case 3:
          const kochiLoc = { id: 3, loc: 'Kochi' };
          this.filterLocation.push(kochiLoc);
          break;
      }
    }
    if (this.filterLocation?.length > 0) {
      this.receivedData.forEach((data) => {
        this.filterLocation.forEach((location) => {
          if (data.location.includes(location.loc)) {
            this.filteredData.push(data);
          }
        });
      });
    } else {
      this.filteredData = this.receivedData;
    }
    this.isFilterDeleted = false;
  }

  priceFilter(id: number) {
    this.filteredData = [];
    this.filterPrice?.forEach((element) => {
      if (element?.id === id) {
        const pos = this.filterPrice?.indexOf(element);
        this.filterPrice.splice(pos, 1);
        this.isFilterDeleted = true;
      }
    });
    if (this.isFilterDeleted === false) {
      switch (id) {
        case 1:
          const free = { id: 1, feeType: 'Free' };
          this.filterPrice.push(free);
          break;
        case 2:
          const paid = { id: 2, feeType: 'paid' };
          this.filterPrice.push(paid);
          break;
      }
    }
    if (this.filterPrice?.length > 0) {
      this.receivedData.forEach((data) => {
        this.filterPrice.forEach((price) => {
          if (data.feeType.includes(price.feeType)) {
            this.filteredData.push(data);
          }
        });
      });
    } else {
      this.filteredData = this.receivedData;
    }
    this.isFilterDeleted = false;
  }
}
