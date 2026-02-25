import { Component, inject, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Word } from 'src/app/model/words.model';
import { WordService } from 'src/app/services/words.service';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationFooterComponent } from "src/app/navigation-footer/navigation-footer.component";

@Component({
    selector: 'app-ask-words',
    templateUrl: './ask-words.component.html',
    styleUrls: ['./ask-words.component.css'],
    imports: [FormsModule, TranslatePipe, NavigationFooterComponent],
    standalone: true
})
export class AskWordsComponent implements OnInit {
  private wordService = inject(WordService);
  words: Word[] = [];
  actualIdx: number = 0;
  actualWord: Word = { hu: '', en: '' };
  helpDisplayed: boolean = false
  isActualFailed: boolean = false;
  answer: string = '';

  ngOnInit(): void {
    this.words = this.wordService.getWords();
    this.wordService.shuffle(this.words);
    this.actualIdx = 0;
    this.actualWord = this.words[this.actualIdx];
  }

  check(){
    if(this.answer.toLowerCase() === this.actualWord?.en.toLowerCase()){
      this.isActualFailed = false;
      this.step(1);
      //TODO: ujra kell-e inditani
    } else {
      this.isActualFailed = true;
    }
    this.answer = '';
  }

  help(){
    this.helpDisplayed = true;
    timer(2000).subscribe(() => {
      this.helpDisplayed = false;
    });
  }

  step(direction: number){
    if(this.actualIdx + direction < this.words.length && this.actualIdx + direction >= 0){
      this.actualIdx += direction;
    }
    this.actualWord = this.words[this.actualIdx];
  }

  getStatusBar(){
    return `${this.actualIdx + 1} / ${this.words.length}`;
  }
}
