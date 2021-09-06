import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Title }     from '@angular/platform-browser';
import { EnvService } from './env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Title]
})
export class AppComponent {
  languages = environment.languages;
  currentLang: string = environment.defaultLang;

  constructor(private title: Title, private translate: TranslateService, private envService: EnvService) {
    envService.getEnv().subscribe(env => {
      // envServiceから言語設定が取れたらデフォルトを上書きする
      if(environment.languages.some(language => language.lang === env.lang)) {
        environment.defaultLang = env.lang!;
      }
      translate.setDefaultLang(environment.defaultLang);
      translate.use(environment.defaultLang);
      this.currentLang = environment.defaultLang;
      this.setTitle();
    });
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
      // 設定を保存
      this.envService.setEnv({lang:lang}).subscribe();
    }
  }

  isCurrentLang(lang: string): boolean {
    return lang === this.currentLang;
  }
}

