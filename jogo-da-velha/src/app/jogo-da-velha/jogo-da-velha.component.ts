import { Component, OnInit } from '@angular/core';
import { JogoDaVelhaService } from './shared/jogo-da-velha.service';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent implements OnInit {

  players : boolean = false;
  iniciar : boolean = true;
  resultado: number = 0;
  width: number = 0;


  constructor( private jogoDaVelhaService : JogoDaVelhaService) { }

  ngOnInit(): void {
    this.jogoDaVelhaService.inicializar();
    this.width = this.tamanhoTela;
  }

  get tamanhoTela(): number{
    var largura = window.innerWidth 
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    return largura;
  }
  
  jogadores(jogadores : number) : void{
    if ( jogadores === 1){
      this.players = false;
    }else{
      this.players = true
    }
    this.iniciar = false;
  }

  get showInicio(): boolean{
    return this.jogoDaVelhaService.showInicio;
  }

  get showTabuleiro() : boolean{
    return this.jogoDaVelhaService.showTabuleiro;
  }

  get showFinal() :boolean{
    return this.jogoDaVelhaService.showFinal;
  }

  iniciarJogo():void{
    this.width = this.tamanhoTela;
    if(this.width <= 400){
      alert("Seu Dispositivo é muito pequeno. Por faver vire-o horizontalmente!!");
      this.iniciarJogo();
    }else{
      this.jogoDaVelhaService.iniciarJogo(this.players);
    }
  }

  jogar(posX: number, posY: number): void{
    this.jogoDaVelhaService.jogar(posX, posY);
  }

  exibirX(posX: number, posY: number): boolean{
    return this.jogoDaVelhaService.exibirX(posX, posY);
  }

  exibirO(posX: number, posY: number): boolean{
    return this.jogoDaVelhaService.exibirO(posX, posY);
  }

  exibirVitoria(posX: number, posY: number): boolean{
    this.exibirResultado();
    return this.jogoDaVelhaService.exibirVitoria(posX, posY);
  }

  novoJogo(): void{
    this.jogoDaVelhaService.inicializar();
    this.jogoDaVelhaService.iniciarJogo(this.players);
  }

  exibirResultado() : void{
    this.resultado = this.jogoDaVelhaService.showResultado;
  }

}
