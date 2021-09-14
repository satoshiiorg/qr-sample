import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Location } from '@angular/common';
import jsQR from 'jsqr';

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

  @Input() message?: string;
  scanQr(list: any): void {
    const file = list[0];
    const reader = new FileReader();
    reader.onload = () => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d')!;
      const img: HTMLImageElement = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data!;
        const code = jsQR(imageData, canvas.width, canvas.height);
        if(code) {
          if(this.profile) {
            this.profile.text = code.data;
          }
          this.message = "scan-success";
        } else {
          this.message = "scan-error";
        }
      }
    }
    reader.readAsDataURL(file);
  }
}
