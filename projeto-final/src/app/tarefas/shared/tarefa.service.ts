import { Injectable } from '@angular/core';
import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  listarTodos(): Tarefa[]{
    const tarefas = localStorage['tarefas'];
    return tarefas ? JSON.parse(tarefas) : [];
  }

  cadastrar(tarefa: Tarefa): void {
    const tarefas = this.listarTodos();
    tarefa.id = new Date().getTime();
    tarefas.push(tarefa);
    localStorage['tarefas'] = JSON.stringify(tarefas)
  }

  buscarPorId( id: number) : Tarefa{
    const tarefas: Tarefa[] = this.listarTodos();
    return tarefas.find(tarefa => tarefa.id === id);
  }

  atualizar(tarefa : Tarefa) : void{
    const tarefas : Tarefa[] = this.listarTodos();
    for( let i = 0; i < tarefas.length; i++){
      if ( tarefas[i].id === tarefa.id){
        tarefas[i] = tarefa;
        break;
      }
    }
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  remover(id : number): void{
    let tarefas : Tarefa[] = this.listarTodos();
    tarefas =tarefas.filter(tarefa => tarefa.id !== id);
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  atualizarStatus(id: number): void{
    const tarefas : Tarefa[] = this.listarTodos();
    for (let i = 0; i < tarefas.length; i++) {
        if( tarefas[i].id === id){
          tarefas[i].concluida = !tarefas[i].concluida;
          break;
        }      
    }
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }
}

