import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Title]
})
export class AppComponent {
  languages = environment.languages;
  currentLang: string = environment.defaultLang;

  constructor(private title: Title, private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLang);
    translate.use(environment.defaultLang);
    this.setTitle();
  }

  setTitle() {
    this.translate.get("title").subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  changeLang(event: any): void {
    const lang = event.target.value;
    if (lang !== this.currentLang) {
      this.translate.use(lang);
      this.currentLang = lang;
      this.setTitle();
    }   
  }

  isCurrentLang(lang: string): boolean {
    return lang === this.currentLang;
  }
}

