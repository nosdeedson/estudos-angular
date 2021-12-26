import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ConversaoResponse } from '../models/conversao-response.model';
import { Conversao } from '../models/conversao.model';
import { ConversorService } from '../services/conversor.service';

@Component({
  selector: 'app-modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit {
  mandarParaOPai = '';

  @Input() id : string;
  @Input() conversaoResponse : ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() devolucao  = new EventEmitter<string>();
  @Output() devolucaoSemBotao = new EventEmitter<string>();

  constructor(private conversorService: ConversorService) { }

  ngOnInit(): void {
  }
  
  novaConsulta(){
    this.devolveSemAcaoUser();
    this.onConfirm.emit()
  }

  devolveSemAcaoUser(){
    this.devolucaoSemBotao.emit('teste sem chamada do html filho');
  }
  
  devolveParaOPai(msg : string){
    this.devolveSemAcaoUser();
    this.mandarParaOPai= msg;
    this.devolucao.emit(this.mandarParaOPai);
  }

  get valorConvertido() : string{
    if ( this.conversaoResponse === undefined){
      return '0'
    }
    return (this.conversao.valor * 
      this.conversaoResponse.rates[this.conversao.moedaPara]).toFixed(2)
  }

  get cotacaoPara() : number{
    return this.conversorService.contacaoPara(this.conversaoResponse, this.conversao);
  }

  get cotacaoDe() : string{
    return this.conversorService.cotacaoDe(this.conversaoResponse, this.conversao);
  }

  get cotacaoData() : string{
    return this.conversorService.dataCotacao(this.conversaoResponse);
  }

}
