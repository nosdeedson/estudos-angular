import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X : number = 1; // jogador vence
  private readonly O : number = 2; // computador venc
  private VAZIO : number = 0;
  private resultado : number = 0;  

  private tabuleiro : any;
  private numeroMovimentos : number;
  private  vitoria : any;
  private _jogador: number;
  private _showInicio : boolean;
  private _showTabuleiro : boolean;
  private _showFinal : boolean;


  constructor() { }

  inicializar(): void{
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numeroMovimentos = 0;
    this._jogador = this.X; 
    this.vitoria = false;
    this.inicializarTabuleiro();
  }

  inicializarTabuleiro() :void{
    this.tabuleiro = [this.TAM_TAB];
    for( let i = 0; i < this.TAM_TAB; i++){
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }

  get showResultado(): number{
    if (this.resultado === 1){
      return 1;
    }else if(this.resultado === 2){
      return 2;
    }else{
      return 3;
    }
  }
  get showInicio(): boolean{
    return this._showInicio
  }

  get showTabuleiro() : boolean{
    return this._showTabuleiro;
  }

  get showFinal() : boolean{
    return this._showFinal;
  }

  get showJogador() : number{
    return this._jogador;
  }

  iniciarJogo(): void{
    this._showInicio = false;
    this._showTabuleiro = true;
  }

  jogar(posX: number, posY: number): void{
    if(this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria){
        return;
    }
    
    this.tabuleiro[posX][posY] = this._jogador;
    this.numeroMovimentos++;
    this.vitoria = this.fimJogo(posX, posY, this.tabuleiro, this._jogador);
    if(this.vitoria){
      this.resultado = 1;
    }
    this._jogador = (this._jogador === this.X) ? this.O : this.X;
    if (this.vitoria){
      this._showFinal = true;
      this.resultado = this._jogador;
    }

    if ( !this.vitoria && this.numeroMovimentos < 9){
      this.cpuJogar();
    }


    if( !this.vitoria && this.numeroMovimentos === 9){
      this._jogador = 0;
      this._showFinal = true;
      this.resultado = 3;
    }
  }

  fimJogo(linha: number, coluna: number, tabuleiro: any, jogador: any): boolean{
    let fim : any = false;
    if(tabuleiro[linha][0] === jogador && tabuleiro[linha][1] === jogador && tabuleiro[linha][2] === jogador){
      fim = [ [linha, 0], [linha, 1], [linha, 2] ];
    }

    if ( tabuleiro[0][coluna] == jogador && tabuleiro[1][coluna] == jogador && tabuleiro[2][coluna] == jogador ){
      fim = [ [0, linha], [1, linha], [2, linha] ]
    }

    if ( tabuleiro[0][0] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][2] === jogador){
      fim = [ [0, 0], [1, 1], [2, 2] ];
    }

    if ( tabuleiro[0][2] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][0] === jogador){
      fim = [ [0, 2], [1, 1], [2, 0] ]
    }
    return fim;
  }

  cpuJogar(): void{
    //verifica jogada the vitoria
    let jogada: number[] =  this.obterJogada(this.O);

    // verifica jogada para evitar derrota
    if( jogada.length <= 0){
      jogada = this.obterJogada(this.X);
    }

    if ( jogada.length <= 0){
      let jogadas : any = [];

      for( let i = 0; i < this.TAM_TAB; i++){
        for(let j = 0; j < this.TAM_TAB; j++){
          if(this.tabuleiro[i][j] === this.VAZIO){
            jogadas.push([i, j]);
          }
        }
      }

      let k = Math.floor( (Math.random() * (jogadas.length - 1)) );
      jogada = [jogadas[k][0], jogadas[k][1] ]
    }
    this.tabuleiro[ jogada[0]][jogada[1]] = this._jogador;
    this.numeroMovimentos++;
    this.vitoria = this.fimJogo(jogada[0], jogada[1], this.tabuleiro, this._jogador);
    if(this.vitoria){
      this.resultado = 2;
      this._showFinal = true;
    }
    this._jogador = (this._jogador === this.X) ? this.O : this.X;
  }

  obterJogada(jogador: number): number[]{
    let tab = this.tabuleiro;
    for( let linha = 0; linha < this.TAM_TAB; linha++){
      for ( let coluna = 0; coluna < this.TAM_TAB; coluna++){
        if(tab[linha][coluna] !== this.VAZIO){
          continue;
        }
        tab[linha][coluna] = jogador;
        if(this.fimJogo(linha, coluna, tab, jogador)){
          return [linha, coluna];
        }
        tab[linha][coluna] = this.VAZIO;
      }
    }
    return [];
  }

  exibirX(posX: number, posY: number): boolean{
    return this.tabuleiro[posX][posY] === this.X;
  }

  exibirO(posX: number, posY: number) : boolean{
    return this.tabuleiro[posX][posY] === this.O;
  }

  exibirVitoria(posX: number, posY: number) : boolean{
    let exibirVitoria : boolean = false;
    if( !this.vitoria){
      return exibirVitoria;
    }

    for( let pos of this.vitoria){
      if(pos[0] === posX && pos[1] === posY){
        exibirVitoria = true;
        break;
      }
    }
    return exibirVitoria;
  }

  novoJogo(): void{
    this.inicializar();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;
  }
}
