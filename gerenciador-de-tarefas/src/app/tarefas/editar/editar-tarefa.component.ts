import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../shared/tarefa.model';
import { TarefaService } from '../shared/tarefa.service';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  @ViewChild("formTarefa", {static: true}) formTarefa: NgForm;

  tarefa : Tarefa;
  tarefas : Tarefa[];
  constructor(private tarefaService: TarefaService, private router: Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.tarefa = this.tarefaService.buscarPorId(Number(id))
  }

  atualizar() : void{
    this.tarefaService.atualizar(this.tarefa);
    this.router.navigate(["/tarefas"])
  }

}
