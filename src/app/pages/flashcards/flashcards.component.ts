import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  WordCardModel,
  createSimpleWord,
} from 'src/app/components/word-card/word-card.model';
import { Word } from 'src/app/model/words.model';
import { WordService } from 'src/app/services/words.service';
import { WordCardComponent } from '../../components/word-card/word-card.component';
import { CommonModule } from '@angular/common';
import { NavigationFooterComponent } from 'src/app/navigation-footer/navigation-footer.component';
import { WordStore } from 'src/app/services/word.store';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css'],
  imports: [CommonModule, WordCardComponent, NavigationFooterComponent, TranslatePipe],
  standalone: true,
})
export class FlashcardsComponent {
  private wordService = inject(WordService);
  private wordStore = inject(WordStore);

  private allWords = this.wordStore.words;

  shuffledWords = signal<Word[]>([]);
  actualWordIdx = signal(0);

  actualWord = computed(() => this.shuffledWords()[this.actualWordIdx()]);

  enWord = computed(() => {
    const word = this.actualWord();
    return word ? createSimpleWord(word.en, true) : undefined;
  });

  huWord = computed(() => {
    const word = this.actualWord();
    return word ? createSimpleWord(word.hu, false) : undefined;
  });

  isFlipped = signal(false);
  actual = computed(() => (this.isFlipped() ? this.huWord() : this.enWord()));

  constructor() {
    effect(() => {
      const wordsToShuffle = [...this.allWords()];
      this.wordService.shuffle(wordsToShuffle);
      this.shuffledWords.set(wordsToShuffle);
      this.reset();
    });
  }

  reset() {
    this.actualWordIdx.set(0);
    this.isFlipped.set(false);
  }

  step(direction: number) {
    this.actualWordIdx.update((currentIdx) => {
      const newIdx = currentIdx + direction;
      if (newIdx >= 0 && newIdx < this.shuffledWords().length) {
        this.isFlipped.set(false);
        return newIdx;
      }
      return currentIdx;
    });
  }

  flip() {
    this.isFlipped.update((flipped) => !flipped);
  }
}
