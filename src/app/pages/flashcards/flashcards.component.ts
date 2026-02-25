import {
  ChangeDetectorRef,
  Component,
  effect,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
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
  words: Word[] = [];
  actualWordIdx = signal(0);

  actual = signal<WordCardModel | undefined>(undefined);

  enWord?: WordCardModel;
  huWord?: WordCardModel;

  constructor(
    private wordService: WordService,
    private wordStore: WordStore
  ) {
    effect(
      () => {
      const currentWords = this.wordStore.words();

      if (currentWords.length > 0) {
        this.reset(currentWords);
      }
      }, {allowSignalWrites: true});
    }


  reset(newWords: Word[]) {
    this.words = [...newWords];
    this.wordService.shuffle(this.words);
    this.actualWordIdx.set(0);

    this.updateCard(0)
  }

  step(direction: number) {
    const currentIdx = this.actualWordIdx();
    const newIdx = currentIdx + direction;

    if(newIdx >= 0 && newIdx < this.words.length){
      this.actualWordIdx.set(newIdx);
      this.updateCard(newIdx);
    }
  }

  private updateCard(idx: number){
    const word = this.words[idx];
    this.enWord = createSimpleWord(word.en, true);
    this.huWord = createSimpleWord(word.hu, false);

    this.actual.set(this.enWord);
  }

  flip() {
    const current = this.actual();
    this.actual.set(current === this.enWord ? this.huWord : this.enWord);
  }

}
