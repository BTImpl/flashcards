import { computed, inject, Injectable, signal } from "@angular/core";
import { WordsApiService } from "./words.api.service";
import { rxResource } from "@angular/core/rxjs-interop";
import { LIST_TYPES, ListTypeEnum } from "../model/header.model";

@Injectable({providedIn: 'root'})
export class WordStore {
  private apiService = inject(WordsApiService);

  readonly selectedSheet = signal<string>('Gabi');
  readonly selectedListType = signal<ListTypeEnum>(ListTypeEnum.UNKNOWN);

  private wordsResource = rxResource({
   params: () => ({
     sheet: this.selectedSheet(),
     range: LIST_TYPES[this.selectedListType()].range
    }),
   stream: ({params}) => this.apiService.getWords(params.sheet, params.range),
  });

  readonly words = computed(() => this.wordsResource.value() ?? []);
}
