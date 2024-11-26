import { Component, AfterViewInit } from '@angular/core';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements AfterViewInit {

  usuario: UsuarioSimples = {}
  calendario: any
  dias = []
  diasUltimoMes = []
  hoje = new Date()
  mal = 0
  triste = 0
  neutro = 0
  otimo = 0
  bem = 0

  constructor(private authService: AuthService) {}

  async ionViewWillEnter() {
    await this.getUserInfo();
  }

  async getUserInfo(){
    this.usuario = await this.authService.getUserInfo()

    if(this.usuario.idUsuario){
    this.calendario = await this.authService.getCalendarioById(this.usuario)
    this.dias = this.calendario.dias
    
    this.diasUltimoMes = this.dias.filter((dia: any)=> new Date(dia.dataZ).getTime()> new Date(`${this.hoje.getFullYear()}-${this.hoje.getMonth()+1}-1`).getTime())
    }
    this.diasUltimoMes.map((dia: any) => {
      if(dia.emocional ==='Bem'){
        this.bem++
      } else if(dia.emocional==='Ótimo'){
        this.otimo++
      } else if(dia.emocional==='Triste'){
        this.triste++
      } else if(dia.emocional==='Mal'){
        this.mal++
      } else if(dia.emocional==='Neutro'){
        this.neutro++
      }
    })

    this.renderChart();
  }

  ngAfterViewInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      console.log('Google Charts carregado');
      console.log('Tentando renderizar gráfico...');
    });
  }
  
  renderChart() {
  const chartData = [
    ['Emocional', 'Dias'],
    ['Ótimo', this.otimo],
    ['Bem', this.bem],
    ['Neutro', this.neutro],
    ['Mal', this.mal],
    ['Triste', this.triste],
  ];
  const chartOptions = {
    title: 'Emocional último mês',
    width: 400,
    height: 300,
  };
    const container = document.getElementById('chart-div');
    if (!container) {
      console.error('Contêiner do gráfico não encontrado!');
      return;
    }
  
    const chart = new google.visualization.PieChart(container);
    chart.draw(google.visualization.arrayToDataTable(chartData), chartOptions);
  }
}
