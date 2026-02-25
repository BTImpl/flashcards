import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SheetsResponse, Word } from '../model/words.model';
import { map, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class WordsApiService {
  private http = inject(HttpClient);

  apiKey = ''; //TODO ezt ne rakd fel!!!!!
  sheetId = '11UCGxa7EAQf_xTrIB2dLQ2zBqiCKZ7SOIylishPYbgs';


  getWords(sheet: string, range: string): Observable<Word[]>{
    const requestUri = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${sheet}!${range}?key=${this.apiKey}`;
    return this.http.get<SheetsResponse>(requestUri).pipe(
      map((response) => {
        return response.values.map(
          (row) =>
            ({
              en: row[0],
              hu: row[1],
            }) as Word,
        );
      }),
    );
  }
}
