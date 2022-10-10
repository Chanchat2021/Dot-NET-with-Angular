import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEventForm } from 'src/app/models/IEventForm';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  title = 'ReactiveForms';
  startDate: Date = new Date();
  endDate: Date = new Date();
  isDatevalid: boolean = true;
  reactiveForm: any;
  eventData: IEventForm = {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    banner: '',
    eventType: 0,
    location: 0,
    rules: '',
    createdBy: '',
  };

  reader = new FileReader();
  fileByteArray: number[] = [];
  arrayBuffer: any;
  array: Uint8Array = new Uint8Array();
  imageData: any;
  constructor(private eventService: EventService, private router: Router) {}

  dateValid() {
    this.startDate = new Date(this.reactiveForm.controls['startDate'].value);
    this.endDate = new Date(this.reactiveForm.controls['endDate'].value);
    this.isDatevalid = this.endDate > this.startDate;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      eventname: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      eventdescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(20),
      ]),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      eventType: new FormControl(null),
      eventbanner: new FormControl(),
      location: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      eventsruleandregulation: new FormControl(null, [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }
  eventBanner(event: any) {
    this.reader.readAsArrayBuffer(event.target.files[0]);
    this.reader.onloadend = (evt: any) => {
      if (evt.target.readyState === FileReader.DONE) {
        (this.arrayBuffer = evt.target.result),
          (this.array = new Uint8Array(this.arrayBuffer));
        for (var a of this.array) {
          this.fileByteArray.push(a);
        }
        console.log(this.fileByteArray);
      }
    };
  }
  onSelect(selectEvent: any): void {
    if (selectEvent.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(selectEvent.target.files[0]);
    }
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageData = reader.result;
    console.log(this.imageData);
  }

  createEvent(files: any) {
    this.startDate = new Date(this.reactiveForm.controls['startDate'].value);
    this.endDate = new Date(this.reactiveForm.controls['endDate'].value);
    this.isDatevalid = this.endDate > this.startDate;
    this.eventData.name = this.reactiveForm.controls['eventname'].value;
    this.eventData.description =
      this.reactiveForm.controls['eventdescription'].value;
    this.eventData.startDate = this.reactiveForm.controls['startDate'].value;
    this.eventData.endDate = this.reactiveForm.controls['endDate'].value;
    this.eventData.location = parseInt(
      this.reactiveForm.controls['location'].value
    );
    this.eventData.eventType = parseInt(
      this.reactiveForm.controls['eventType'].value
    );
    this.eventData.banner = this.imageData.split(',')[1];
    this.eventData.rules =
      this.reactiveForm.controls['eventsruleandregulation'].value;
    var emailId = localStorage.getItem('emailId');
    this.eventData.createdBy = emailId == null ? '' : emailId;
    console.log(this.eventData);
    this.eventService.createEvent(this.eventData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error(error: HttpErrorResponse) {
        throw error
      },
    });
  }
  get eventname() {
    return this.reactiveForm.get('eventname');
  }
  get eventdescription() {
    return this.reactiveForm.get('eventdescription');
  }
  get location() {
    return this.reactiveForm.get('location');
  }
  get eventbanner() {
    return this.reactiveForm.get('eventbanner');
  }
  get eventsruleandregulation() {
    return this.reactiveForm.get('eventsruleandregulation');
  }
  get enddate() {
    return this.reactiveForm.get('endDate');
  }
}
