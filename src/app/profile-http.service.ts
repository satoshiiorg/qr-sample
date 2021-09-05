import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpService extends ProfileService {

  private profilesUrl = 'api/profiles';  // Web APIのURL
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    super();
  }
  
  /** GET:  */
  getProfiles(): Observable<Profile[]> {

    console.log("ProfileInMemoryService");
    return this.http.get<Profile[]>(this.profilesUrl)
                    .pipe(
                      // tap(profiles => this.log('fetched profiles')),
                      catchError(this.handleError<Profile[]>('getProfiles', []))
                    );
  }

  getProfile(id: number): Observable<Profile> {
    const url = `${this.profilesUrl}/${id}`;
    return this.http.get<Profile>(url).pipe(
      // tap(_ => this.log(`fetched profile id=${id}`)),
      catchError(this.handleError<Profile>(`getHero id=${id}`))
    );
  }

  /* 検索語を含むヒーローを取得する */
  searchProfiles(term: string): Observable<Profile[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Profile[]>(`${this.profilesUrl}/?name=${term}`).pipe(
      // tap(_ => this.log(`found profiles matching "${term}"`)),
      catchError(this.handleError<Profile[]>('searchHeroes', []))
    );
  }

  /** PUT:  */
  updateProfile(profile: Profile): Observable<any> {
    return this.http.put(this.profilesUrl, profile, this.httpOptions)
                    .pipe(
                      // tap(_ => console.log(`updated profile id=${profile.id}`)),
                      catchError(this.handleError<any>('updateProfile'))
                    );
  }

  /** POST:  */
  addProfile(profile: Profile): Observable<Profile> {
    //FIXME STUB
    return of();
  }

  deleteProfile(id: number): Observable<void> {
    //FIXME STUB
    return of();
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      // this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }


}
