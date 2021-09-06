import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qr-sample';
  languages = environment.languages;
  currentLang: string = environment.defaultLang;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLang);
    translate.use(environment.defaultLang);
  }

  changeLang(event: any): void {
    const lang = event.target.value;
    if (lang !== this.currentLang) {
      this.translate.use(lang);
      this.currentLang = lang;
    }   
  }

  isCurrentLang(lang: string): boolean {
    return lang === this.currentLang;
  }
}

