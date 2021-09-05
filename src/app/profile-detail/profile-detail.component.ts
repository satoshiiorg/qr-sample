import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  @Input() profile?: Profile;
  
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      // id指定ありの場合は既存の項目を取得
      this.profileService
          .getProfile(id)
          .subscribe(profile => this.profile = profile);
    } else {
      // id指定なしの場合は空のprofileをセット
      this.profile = {} as Profile;
    }
  }

  save(): void {
    this.profileService
        .updateProfile(this.profile!)
        .subscribe();
  }

  add(): void {
    this.profileService
        .addProfile(this.profile!)
        .subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
