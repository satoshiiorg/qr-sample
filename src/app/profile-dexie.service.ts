import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Dexie } from 'dexie';

import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileDexieService extends ProfileService {

  table: Dexie.Table<Profile, number>;

  constructor() {
    super();
    const dexieService = new class extends Dexie {
      constructor() {
        super('Profiles');
        this.version(1).stores({
          profiles: '++id',
        });
        this.version(2).stores({
          profiles: "++id",
        }).upgrade(trans => {
          return trans.table("profiles").toCollection().modify(profile => {
            profile.text = '';
            profile.datetime = new Date();
          });
        });
      }
    };

    this.table = dexieService.table('profiles');
  }

  override getProfiles(): Observable<Profile[]> {
    return from(this.table.toArray());
  }

  override getProfile(id: number): Observable<Profile | undefined> {
    return from(this.table.get(id));
  }

  override searchProfiles(term: string): Observable<Profile[]> {
    const lowerTerm = term.trim().toLowerCase();
    if(!lowerTerm) {
      return of();
    }
    return from(this.table.filter(profile => profile.name.toLowerCase().indexOf(lowerTerm) > -1).toArray());
  }

  override updateProfile(profile: Profile): Observable<any> {
    // TODO ここは一考
    profile.datetime = new Date();
    return from(this.table.update(profile.id, profile));
    // return from(this.table.put(profile));
  }

  override addProfile(profile: Profile): Observable<Profile> {
    profile.datetime = new Date();
    return from(this.table.add(profile).then(id => {profile.id = id; return profile;}));
  }

  override deleteProfile(id: number): Observable<void> {
    return from(this.table.delete(id));
  }
}
