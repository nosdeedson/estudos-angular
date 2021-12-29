import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculadoraService } from '../service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  @ViewChild("showProjetos", {static: true})  showProjetos : boolean;

  constructor( private calculadoraService: CalculadoraService) { }

  numero1 : string;
  numero2 : string;
  operacao : string;
  resultado : number;

  ngOnInit(): void {
    this.limpar();
  }


  limpar(){
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  get display(): string{
    if( this.resultado !== null && this.operacao !== null){
      return this.resultado.toString();
    }
    else if( this.numero2 !== null){
      return this.numero2;
    }
    return this.numero1;
  }

  setarnumero(numero : string) : void{
    if( this.operacao === null){
      if (this.numero1 === '0' && numero !== '.'){
        this.numero1 = numero;
      } else if ( numero === '.'){
        this.numero1 += numero;
      } else if (  this.numero1 !== '0' && numero !== "." ){
        this.numero1 = numero;
      }else{
        this.numero1 += numero;
      }
    }else{
      if (numero === '.' && this.numero2 === null){
        this.numero2 = '0.';
      }else if(this.numero2 === null){
        this.numero2 = numero;
      }else{
        this.numero2 += numero;
      }
    }
  }

  setarOperacao(operacao : string) : void{
    this.operacao = operacao;
  }

  realizarOperacao(){
    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1), parseFloat(this.numero2), this.operacao
    );
    this.numero1 = this.resultado.toString();
    this.numero2 = null;
    this.operacao = null;
    this.resultado = null;
  }


}
