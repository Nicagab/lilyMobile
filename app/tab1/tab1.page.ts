import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import Dia from '../interfaces/DiaI';
import { AuthService } from '../services/auth.service';

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
  navH = 0;
  diaClicado: Dia = {}

  public helpInfos = [
    { header: 'Teste1', subHeader: 'teste1', message: 'mensagem1' },
    { header: 'Teste2', subHeader: 'teste2', message: 'mensagem2' },
    { header: 'Teste3', subHeader: 'teste3', message: 'mensagem3' }
  ];

  constructor(private alertController: AlertController, private menuController: MenuController, private authService: AuthService) {
    this.gerarDias();
  }

  async showCalendarAlert(){
    const alert = await this.alertController.create({

    })
    await alert.present()
  }

  async showHelpAlert() {
    const alert = await this.alertController.create({
      header: this.helpInfos[this.navH].header,
      subHeader: this.helpInfos[this.navH].subHeader,
      message: this.helpInfos[this.navH].message,
      buttons: [
        {
          text: 'Back',
          handler: () => {
            if (this.navH > 0) {this.navH--;
            this.showHelpAlert();}
          },
          cssClass: this.navH < 1 ? 'disabled' : ''
        },
        {
          text: this.navH === this.helpInfos.length-1 ? 'Ok' : 'Next',
          role: this.navH === this.helpInfos.length-1 ? 'confirm' : '',
          handler: () => {
            if (this.navH < this.helpInfos.length - 1) {
              this.navH++;
              this.showHelpAlert();
            } else {
              this.navH = 0;
            }
          }
        },
      ]
    });

    await alert.present();
  }

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
        this.dias.push({ numero: i, classe: 'day hoje', dataZ: `${this.anoAtual}-${this.mesAtual+1}-${i}` });
      } else {
        this.dias.push({ numero: i, classe: 'day', dataZ: `${this.anoAtual}-${this.mesAtual+1}-${i}` });
      }
    }

    while (this.dias.length % 7 !== 0) {
      this.dias.push({ classe: 'nullday' });
    }
  }

  avancarMes() {
    this.navM++;
    this.gerarDias();
  }

  voltarMes() {
    this.navM--;
    this.gerarDias();
  }

  abrirMenuDia(dia: Dia){
    this.diaClicado = dia
    this.menuController.open('menuDia')
  }
}
