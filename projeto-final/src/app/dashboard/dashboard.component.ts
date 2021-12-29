import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados/dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  private dados : any;

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.obterDados().subscribe(dados =>{
      this.dados = dados;
      this.init()
    });
  }

  init(): void {
    if(typeof(google) !== undefined ){
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos(): void{
    this.exibirPieChart();
    setTimeout(() => {
      this.exibirPieChart3D();
    }, 1000);
    setTimeout(() => {
      this.exibirDonutChart();
    }, 2000);
    setTimeout(() => {
      this.exibirBarChart();
    }, 3000);
    setTimeout(() => {
      this.exibirLineChart();
    }, 4000);
    setTimeout(() => {
      this.exibirColumnChart();
    }, 5000);
  }

  exibirColumnChart(): void{
    var chart = new google.visualization.ColumnChart(document.getElementById("column_chart"));
    let opcoes = this.obterOpcoes('Column chart');
    opcoes['legend'] = 'bottom';
    chart.draw(this.obterDataTable(), opcoes);
  }
  exibirLineChart(): void{
    var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    let opcoes = this.obterOpcoes('Line');
    opcoes['legend'] = 'bottom'
    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirBarChart():void{
    var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
    let opcoes = this.obterOpcoes('Bar Chart')
    opcoes['legend'] = "bottom" 
    chart.draw(this.obterDataTable(), opcoes)
  }

  exibirDonutChart() : void{
    var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
    let opcoes = this.obterOpcoes('Donut');
    opcoes['pieHole'] = 0.4;
    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirPieChart3D(): void{
    var chart = new google.visualization.PieChart(document.getElementById('3d_pie_chart'));
    let opcoes = this.obterOpcoes('3D Pie Chart')
    opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(this.obterDataTable(), this.obterOpcoes('Pie'));
  }


  obterDataTable(): any{
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'quantidade');
    data.addRows(this.dados);
    return data;
  }

  obterOpcoes(tipo: string): any{
    return {
      'title': 'Teste gráficos '+tipo,
      'width': 400,
      'height': 300,
      'strokeWidth': '1px',
      'stroke': 'black'
    }
  }
}
