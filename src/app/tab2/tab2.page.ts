import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import Calendario from '../interfaces/CalendarioI';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(private authService: AuthService) {}

  async ionViewWillEnter() {
    await this.getUserInfo();
  }

  usuario: UsuarioSimples = {};
  calendario: Calendario = {};
  hoje = new Date();
  fase = '';
  faseVisivel = '';
  diasRestantes = 0;
  proximaFase = '';
  chipColor = '';

  async getUserInfo() {
    this.usuario = await this.authService.getUserInfo();
    this.getCalendarioInfo();
  }

  async getCalendarioInfo() {
    this.calendario = await this.authService.returnCalendario(
      this.usuario.idUsuario
    );
    if (this.calendario.idCalendario) {
      const infos = this.calcularFase(
        this.hoje,
        this.calendario.inicioCiclo,
        this.calendario.duracao
      );
      this.fase = infos.split('-')[0];
      this.proximaFase = infos.split('-')[1];
      this.diasRestantes = Number(infos.split('-')[2]);
      console.log(infos);
      if (this.fase === 'lutea') {
        this.faseVisivel = 'Lútea';
        this.chipColor = 'light';
      } else if (this.fase === 'menstrual') {
        this.faseVisivel = 'Menstrual';
        this.chipColor = 'danger';
      } else if (this.fase === 'ovulacao') {
        this.faseVisivel = 'Ovulação';
        this.chipColor = 'warning';
      } else {
        this.faseVisivel = 'Folicular';
        this.chipColor = 'success';
      }
      if (this.proximaFase === 'lutea') {
        this.chipColor = 'light';
      } else if (this.proximaFase === 'menstrual') {
        this.chipColor = 'danger';
      } else if (this.proximaFase === 'ovulacao') {
        this.chipColor = 'warning';
      } else {
        this.chipColor = 'success';
      }
    }
  }

  calcularFase(dia: any, inicioCiclo: any, duracao: any) {
    const dataAtual = new Date(dia);
    const dataInicioCiclo = new Date(inicioCiclo);

    const diasDesdeInicio = Math.floor(
      (dataAtual.getTime() - dataInicioCiclo.getTime()) / (1000 * 60 * 60 * 24)
    );
    const diaCiclo = ((diasDesdeInicio % 28) + 28) % 28;

    if (diaCiclo >= 0 && diaCiclo <= duracao) {
      // Fase Menstrual
      return `menstrual-lutea-${duracao - diaCiclo}`;
    } else if (diaCiclo > duracao && diaCiclo < 9) {
      // Fase Lútea Transitória
      return `lutea-folicular-${9 - diaCiclo}`;
    } else if (diaCiclo === 13) {
      // Ovulação
      return `ovulacao-lutea-${15 - diaCiclo}`;
    } else if (diaCiclo >= 9 && diaCiclo <= 14) {
      // Fase Folicular
      return `folicular-ovulacao-${14 - diaCiclo}`;
    } else if (diaCiclo > 14 && diaCiclo < 28) {
      // Fase Lútea
      return `lutea-menstrual-${28 - diaCiclo}`;
    } else {
      // Ajuste em caso de erro
      return `erro-erro-0`;
    }
  }
}
