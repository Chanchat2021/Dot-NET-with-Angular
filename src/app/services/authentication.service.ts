import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private msalService: MsalService) {}
  InitLogin() {
    return this.msalService.instance.handleRedirectPromise().then((res) => {
      if (res != null && res.account != null) {
        this.msalService.instance.setActiveAccount(res.account);
      }
    });
  }
  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }
  getLoggedInUserInformation() {
    return this.msalService.instance.getActiveAccount();
  }
  login() {
    return this.msalService.loginRedirect();
  }
  logout() {
    return this.msalService.logout();
  }
}
