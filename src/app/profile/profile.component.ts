import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // TODO これでいいのか？
  @Input() profile: Profile = { name: '' } as Profile;

  constructor(
    private profileService: ProfileService,
    private location: Location) { }

  ngOnInit(): void {
  }

  add(): void {
    this.profileService.addProfile(this.profile).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
