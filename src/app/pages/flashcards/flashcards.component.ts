import { Component, OnInit } from '@angular/core';
import { WordCardModel,createSimpleWord } from 'src/app/components/word-card/word-card.model';
import { Word } from 'src/app/model/words.model';
import { WordService } from 'src/app/services/words.service';
import { WordCardComponent } from '../../components/word-card/word-card.component';
import { CommonModule } from '@angular/common';
import { NaigationFooterComponent } from "src/app/naigation-footer/naigation-footer.component";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css'],
  imports: [CommonModule, WordCardComponent, NaigationFooterComponent],
  standalone: true,
})
export class FlashcardsComponent implements OnInit {
  words = this.wordService.getWords();
  actualWordIdx: number = 0;
  actualWord: Word = { hu: '', en: '' };

  actual?: WordCardModel;
  enWord?: WordCardModel;
  huWord?: WordCardModel;

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.wordService.shuffle(this.words);
    this.step(0);
  }

  step(direction: number) {
    const newIdx = this.actualWordIdx + direction;
    this.actualWordIdx = newIdx < this.words.length && newIdx >= 0 ? newIdx : this.actualWordIdx;
    this.actualWord = this.words[this.actualWordIdx];
    this.setActualWordCard(this.actualWord);
  }

  flip() {
    this.actual = this.actual === this.enWord ? this.huWord : this.enWord;
  }

  private setActualWordCard(word: Word) {
    this.enWord = createSimpleWord(word.en, true);
    this.huWord = createSimpleWord(word.hu, false);
    this.actual = this.enWord;
  }
}
