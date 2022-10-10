import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'create-event', component: CreateEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
