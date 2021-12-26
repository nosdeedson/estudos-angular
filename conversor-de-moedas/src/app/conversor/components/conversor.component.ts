import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversaoResponse } from '../models/conversao-response.model';
import { Conversao } from '../models/conversao.model';
import { Moeda } from '../models/moeda.model';
import { ConversorService } from '../services/conversor.service';
import { MoedaService } from '../services/moeda.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas : Moeda[];
  conversao: Conversao;
  naoPossuiErro : boolean;
  conversaoResponse : ConversaoResponse;

  @ViewChild("conversaoForm" , {static: true}) conversaoForm : NgForm;

  constructor(private moedaServive: MoedaService,
    private conversorService : ConversorService) { }

  ngOnInit(): void {
    this.moedas = this.moedaServive.listarTodar();
    this.init();
  }

  init() : void{
    this.conversao = new Conversao("EUR", "BRL", null);
    this.naoPossuiErro = true;
  }

  converter() : void{
    if(this.conversaoForm.form.valid){
      this.conversorService.converter(this.conversao)
        .toPromise()
        .then(response => {
          this.conversaoResponse = response;
          this.naoPossuiErro = response.success
        })
        .catch(error => { this.naoPossuiErro = error.success; });
    }
  }

}
