import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';

const ENV_KEY = 'ENV_KEY';
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

class Environment {
  lang?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {
  }
  
  getEnv(): Observable<Environment> {
    // TODO バージョン番号もたせる
    return of(JSON.parse(this.storage.getItem(ENV_KEY) || "{}"));
  }

  setEnv(env: Environment): Observable<void> {
    return of(this.storage.setItem(ENV_KEY, JSON.stringify(env)));
  }
}
