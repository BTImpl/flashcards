import { computed, inject, Injectable, signal } from "@angular/core";
import { WordsApiService } from "./words.api.service";
import { rxResource } from "@angular/core/rxjs-interop";
import { KnownUnknownEnum } from "../model/header.model";

@Injectable({providedIn: 'root'})
export class WordStore {
  private apiService = inject(WordsApiService);

  readonly selectedSheet = signal<string>('Gabi');
  readonly selectedCols = signal<string>(KnownUnknownEnum.UNKNOWN);

  private wordsResource = rxResource({
   params: () => ({sheet: this.selectedSheet(), range: this.selectedCols()}),
   stream: ({params}) => this.apiService.getWords(params.sheet, params.range),
  });

  readonly words = computed(() => this.wordsResource.value() ?? []);
}
