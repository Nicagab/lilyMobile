import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import Calendario from '../interfaces/CalendarioI';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private authService: AuthService) {
  }

  async ionViewWillEnter(){
    await this.getUserInfo()
  }

  usuario: UsuarioSimples = {}
  calendario: Calendario = {}
  hoje = new Date()
  fase = ''

  redirecionarLogin(){
    if(!this.authService.isLogged()){

    }
  }

  async getUserInfo(){
    this.usuario = await this.authService.getUserInfo()
    console.table(this.usuario)
    this.getCalendarioInfo()
  }

  async getCalendarioInfo(){
    this.calendario = await this.authService.returnCalendario(this.usuario.idUsuario)
    console.log(this.calendario)
    if(this.calendario.idCalendario){
      this.fase = this.calcularFase(this.hoje, this.calendario.inicioCiclo, this.calendario.duracao)
    }
    
  }

  calcularFase(dia: any, inicioCiclo: any, duracao: any) {
    const dataAtual = new Date(dia);
    const dataInicioCiclo = new Date(inicioCiclo);

    const diasDesdeInicio = Math.floor((dataAtual.getTime() - dataInicioCiclo.getTime()) / (1000 * 60 * 60 * 24));
    const diaCiclo = diasDesdeInicio % 28;

    if (diaCiclo >= 0 && diaCiclo < Number(duracao)) return 'menstrual';
    if (diaCiclo === 13) return 'ovulacao';
    if (diaCiclo >= 9 && diaCiclo <= 14) return 'folicular';
    return 'lutea';
}
}
 