import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  constructor() { }

  static readonly SUBTRACAO : string = '-';
  static readonly SOMA : string = '+';
  static readonly DIVISAO : string = '/';
  static readonly MULTIPLICACAO : string = '*';

  /**
   * 
   * @param operador1 
   * @param operador2 
   * @param operacao 
   * @returns 
   */
  calcular(operador1: number, operador2: number, operacao: string): number{

    switch (operacao) {
      case CalculadoraService.DIVISAO:
        return operador1 / operador2
      case  CalculadoraService.MULTIPLICACAO:
        return operador2 * operador1;
      case CalculadoraService.SOMA:
        return operador1 + operador2;
      case CalculadoraService.SUBTRACAO:
        return operador1 - operador2;
      default:
        return 0;
    }

  }

}
