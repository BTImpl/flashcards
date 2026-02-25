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
    console.log(`sheet: ${sheet}, range: ${range}`);
    const requestUri = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${sheet}!${range}?key=${this.apiKey}`;
    console.log('Get data from: ' + requestUri);
    return this.http.get<SheetsResponse>(requestUri).pipe(
      map((response) => {
        console.log(JSON.stringify(response.values));
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

  /*getWords(): Observable<Word[]> {
    return this.http.get<SheetsResponse>(this.requestUri).pipe(
      map((response) => {
        return response.values.slice(1).map(
          (row) =>
            ({
              en: row[0],
              hu: row[1],
            }) as Word,
        );
      }),
    );
  }*/
}
