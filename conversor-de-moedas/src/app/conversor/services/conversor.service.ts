import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversao } from '../models/conversao.model';
import { ConversaoResponse } from '../models/conversao-response.model';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private base_url = "http://data.fixer.io/api/latest?access_key=ab75bf57dc36fc9f129b95d750e94549";

  constructor(private http: HttpClient) { }

  converter(conversao: Conversao): Observable<any> {
    let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    return this.http.get(this.base_url + params)
  }

  contacaoPara(conversaoResponse: ConversaoResponse,
    conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return conversaoResponse.rates[conversao.moedaPara];
  }

  cotacaoDe(conversaoResponse: ConversaoResponse,
    conversao: Conversao): string {
    if (conversaoResponse == undefined) {
      return '0'
    }
    return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4);
  }

  dataCotacao(conversaoResponse: ConversaoResponse,
  ): string {
    if (conversaoResponse == undefined) {
      return '';
    }
    return conversaoResponse.date;
  }
}
