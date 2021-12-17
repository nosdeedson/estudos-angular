import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../shared/tarefa.model';
import { TarefaService } from '../shared/tarefa.service';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent implements OnInit {

  tarefas : Tarefa[];

  constructor( private tarefasService : TarefaService) { }

  ngOnInit(): void {
    this.tarefas = this.listarTodos(); 
  }

  listarTodos(): Tarefa[]{
    return this.tarefasService.listarTodos();
  }

  remover(tarefa : Tarefa): void{
    if(confirm("Deseja remover tarefa " + tarefa.nome + "?"))
      this.tarefasService.remover(tarefa.id);
    
  } 

  finalizarTarefa(tarefa : Tarefa){
    if(confirm("Deseja atualizar o status da tarefa " + tarefa.nome + "?"))
    this.tarefasService.atualizarStatus(tarefa.id);
    this.tarefas = this.listarTodos();
  }
}
