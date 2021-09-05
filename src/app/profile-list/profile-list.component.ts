import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  
  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles(): void {
    this.profileService
        .getProfiles()
        // .subscribe(profiles => this.profiles = profiles.sort().reverse());
        // .subscribe(profiles => this.profiles = profiles.orderBy('datetime').reverse());
        .subscribe(profiles => this.profiles = profiles.sort(Profile.datetimeOrder).reverse());
  }

  delete(profile: Profile): void {
    this.profileService.deleteProfile(profile.id).subscribe(() => this.getProfiles());
  }
}
