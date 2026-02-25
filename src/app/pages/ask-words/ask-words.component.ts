import { Component, computed, effect, inject, signal } from '@angular/core';
import { Word } from 'src/app/model/words.model';
import { WordService } from 'src/app/services/words.service';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationFooterComponent } from "src/app/navigation-footer/navigation-footer.component";
import { WordStore } from 'src/app/services/word.store';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ask-words',
    templateUrl: './ask-words.component.html',
    styleUrls: ['./ask-words.component.css'],
    imports: [CommonModule, FormsModule, TranslatePipe, NavigationFooterComponent],
    standalone: true
})
export class AskWordsComponent {
  private wordService = inject(WordService);
  private wordStore = inject(WordStore);

  private allWords = this.wordStore.words;

  shuffledWords = signal<Word[]>([]);
  actualIdx = signal(0);

  actualWord = computed(() => this.shuffledWords()[this.actualIdx()]);

  helpDisplayed = signal(false);
  isActualFailed = signal(false);
  answer = signal('');

  constructor() {
    effect(() => {
      const wordsToShuffle = [...this.allWords()];
      this.wordService.shuffle(wordsToShuffle);
      this.shuffledWords.set(wordsToShuffle);
      this.actualIdx.set(0);
    });
  }

  check(){
    if (this.answer().toLowerCase() === this.actualWord()?.en.toLowerCase()){
      this.isActualFailed.set(false);
      this.step(1);
    } else {
      this.isActualFailed.set(true);
    }
    this.answer.set('');
  }

  help(){
    this.helpDisplayed.set(true);
    setTimeout(() => {
      this.helpDisplayed.set(false);
    }, 2000);
  }

  step(direction: number){
    this.actualIdx.update(currentIdx => {
      const newIdx = currentIdx + direction;
      if (newIdx >= 0 && newIdx < this.shuffledWords().length) {
        return newIdx;
      }
      return currentIdx;
    });
  }
}
