import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  readonly dados = [
    ['janeiro', 33],
    ['fevereiro', 68],
    ['Março', 46],
    ['Abril', 61],
    ['maio', 45],
    ['junho',37]
  ]

  constructor() { }

  obterDados() : Observable<any>{
    return new Observable(observable =>{
      observable.next(this.dados);
      observable.complete();
    })
  }
}
