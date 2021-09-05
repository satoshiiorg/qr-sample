import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Profile } from './profile';
import { ProfileService } from './profile.service';

const PROFILE_KEY = 'PROFILE_KEY';
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class ProfileLocalStorageService extends ProfileService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {
    super();
  }

  /** GET:  */
  override getProfiles(): Observable<Profile[]> {
    // TODO バージョン番号もたせる
    console.log("ProfileLocalStorageService");
    return of(JSON.parse(this.storage.getItem(PROFILE_KEY) || "[]"));
  }

  override getProfile(id: number): Observable<Profile | undefined> {
    //TODO 
    const profiles: Profile[] = JSON.parse(this.storage.getItem(PROFILE_KEY) || "[]");
    const profile = profiles.find(p => p.id === id);
    return of(profile);
  }

  override searchProfiles(term: string): Observable<Profile[]> {
    if (!term.trim()) {
      return of([]);
    }

    const regex = new RegExp(`*${term.trim()}*`);
    const profiles: Profile[] = JSON.parse(this.storage.getItem(PROFILE_KEY) || "[]");
    return of(profiles.filter(p => regex.test(p.name)));
  }

  /** PUT:  */
  override updateProfile(profile: Profile): Observable<void> {
    // FIXME 
    this.storage.setItem(PROFILE_KEY, JSON.stringify([profile]));
    const profiles: Profile[] = JSON.parse(this.storage.getItem(PROFILE_KEY) || "[]");
    const dbProfile = profiles.find(p => p.id === profile.id);
    if(dbProfile != null) {
      dbProfile.name = profile.name;
    }
    return of();
  }

  /** POST: */
  override addProfile(profile: Profile): Observable<Profile> {
    this.getProfiles().subscribe(profiles => {
      // idの最大値に+1する
      // profile.id = Math.max(...profiles.map(p => p.id)) + 1;
      profile.id = profiles.map(p => p.id).reduce((id1, id2) => Math.max(id1, id2)) + 1;
      profiles.push(profile);
      this.storage.setItem(PROFILE_KEY, JSON.stringify(profiles));
    });
    // TODO あやしい
    return of(profile);
  }

  override deleteProfile(id: number): Observable<void> {
    return new Observable((observer) => {
      const profiles: Profile[] = JSON.parse(this.storage.getItem(PROFILE_KEY)!);
      const newProfiles = profiles.filter(p => p.id !== id);
      this.storage.setItem(PROFILE_KEY, JSON.stringify(newProfiles));
    });
  }
}
