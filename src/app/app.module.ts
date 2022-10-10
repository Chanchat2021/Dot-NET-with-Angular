import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import {
  MsalInterceptor,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MSALInstanceFactory,
  MSALInterceptorConfigFactory,
} from './msalAuthConfig';
import { CardComponent } from './components/card/card.component';
import { JoinTeamComponent } from './components/join-team/join-team.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { GlobalErrorHandler } from './globalErrorHandler';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateEventComponent,
    FooterComponent,
    HomePageComponent,
    EventDetailsComponent,
    RegisterComponent,
    CardComponent,
    JoinTeamComponent,
    RegisterComponent,
    CreateTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MsalModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
