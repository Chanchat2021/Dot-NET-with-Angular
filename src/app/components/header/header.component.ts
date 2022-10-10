import { GraphService } from './../../services/graphService';
import { Component, DoCheck, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IProfile } from 'src/app/models/IProfile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck, OnInit {
  profile!: IProfile;
  ProfilePicLink: SafeResourceUrl = '';
  IsLoggedIn: boolean = false;
  alternateImage: string = '../../assets/profile_image.jpeg';

  constructor(
    private service: AuthenticationService,
    private domSanitizer: DomSanitizer,
    private graphService: GraphService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.service.InitLogin();
    await this.getProfilePic();
  }
  ngDoCheck(): void {
    if (this.IsLoggedIn !== this.isLoggedIn()) {
      this.getUserInfo();
    }
    this.IsLoggedIn = this.isLoggedIn();
  }
  login(): void {
    this.service.login();
  }
  logout() {
    this.service.logout();
  }
  isLoggedIn() {
    return this.service.isLoggedIn();
  }
  getProfilePic() {
    return this.graphService.getMyProfileImage().subscribe({
      next: (res: Blob) => {
        var urlCreator = window.URL || window.webkitURL;
        const blobUrl = window.URL.createObjectURL(res);
        this.ProfilePicLink = this.domSanitizer.bypassSecurityTrustResourceUrl(
          urlCreator.createObjectURL(res)
        );
      },
      error(error: HttpErrorResponse) {
        throw error
      },
    });
  }
  getUserInfo() {
    this.graphService.getMyInformation().subscribe({
      next: (res: IProfile) => {
        this.profile = res;
        localStorage.setItem('emailId', this.profile.mail);
      },
      error(error: HttpErrorResponse) {
        throw error
      },
    });
  }
}
