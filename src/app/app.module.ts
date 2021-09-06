import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxKjuaModule } from 'ngx-kjua';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ProfileService } from './profile.service';
import { ProfileLocalStorageService } from './profile-local-storage.service';
import { ProfileHttpService } from './profile-http.service';
import { ProfileDexieService } from './profile-dexie.service';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileListComponent,
    ProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    NgxKjuaModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    // { provide: ProfileService, useClass: ProfileLocalStorageService }
    // { provide: ProfileService, useClass: ProfileInMemoryService }
    { provide: ProfileService, useClass: ProfileDexieService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
