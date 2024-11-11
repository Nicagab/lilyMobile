import { Component } from '@angular/core';
import Dia from '../interfaces/DiaI';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  navM = 0;
  dias: Dia[] = [];
  hoje = new Date();
  anoAtual = 0;
  mesAtual = 0;

  gerarDias() {
    this.dias.length = 0;

    const dataAtualizada = new Date(this.hoje.getFullYear(), this.hoje.getMonth() + this.navM, 1);
    this.anoAtual = dataAtualizada.getFullYear();
    this.mesAtual = dataAtualizada.getMonth();

    const diasNoMes = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
    const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1).getDay();

    for (let i = 0; i < primeiroDia; i++) {
      this.dias.push({ classe: 'nullday' });
    }

    for (let i = 1; i <= diasNoMes; i++) {
      if (i === this.hoje.getDate() && this.navM === 0) {
        this.dias.push({ numero: i, classe: 'day hoje' });
      } else {
        this.dias.push({ numero: i, classe: 'day' });
      }
    }

    while (this.dias.length % 7 !== 0) {
      this.dias.push({ classe: 'nullday' });
    }
  }

  constructor() {
    this.gerarDias();
  }

  avancarMes() {
    this.navM++;
    this.gerarDias();
  }

  voltarMes() {
    this.navM--;
    this.gerarDias();
  }
}