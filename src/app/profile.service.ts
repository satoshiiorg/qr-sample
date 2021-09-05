import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export abstract class ProfileService {

  /** GET:  */
  abstract getProfiles(): Observable<Profile[]>;

  /** GET:  */
  abstract getProfile(id: number): Observable<Profile | undefined>;

  /** GET:  */
  abstract searchProfiles(term: string): Observable<Profile[]>;

  /** PUT:  */
  abstract updateProfile(profile: Profile): Observable<void>;

  /** POST:  */
  abstract addProfile(profile: Profile): Observable<Profile>;

  /** DELETE:  */
  abstract deleteProfile(id: number): Observable<void>;
}
