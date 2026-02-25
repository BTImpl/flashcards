import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WordService } from './services/words.service';
import { Word, Words } from './model/words.model';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { WordsApiService } from './services/words.api.service';
import { WordStore } from './services/word.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Flashcards';
  ws = inject(WordStore);

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
