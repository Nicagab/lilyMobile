import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

import DiaVisual from '../interfaces/DiaVisualI';
import Dia from '../interfaces/DiaI'
import Sintoma from '../interfaces/SintomaI';
import DiaSintoma from '../interfaces/DiaSintomaI';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import Calendario from '../interfaces/CalendarioI';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  usuario: UsuarioSimples = {};
  calendario: Calendario = {};
  meses = [ 
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  hoje = new Date();
  navM = 0;
  diaVs: DiaVisual[] = [];
  dias: Dia[] = []
  anoAtual = 0;
  mesAtual = 0;
  navH = 0;
  diaVClicado: DiaVisual = {};
  diaClicado: Dia = {}
  diasSintomas: DiaSintoma[] = []
  sintomasFisicos: Sintoma[] = [];
  sintomasEmocionais: Sintoma[] = [];

  public helpInfos = [
    { header: 'Teste1', subHeader: 'teste1', message: 'mensagem1' },
    { header: 'Teste2', subHeader: 'teste2', message: 'mensagem2' },
    { header: 'Teste3', subHeader: 'teste3', message: 'mensagem3' },
  ];

  constructor(
    private alertController: AlertController,
    private menuController: MenuController,
    private authService: AuthService
  ) {
    this.getSintomas();
  }

  async ionViewWillEnter(){
    await this.getUserInfo()
  }

  async getUserInfo() {
    this.usuario = await this.authService.getUserInfo();
    await this.gerarDias();
  }
  async getCalendarioInfo(){
    this.calendario = await this.authService.returnCalendario(this.usuario.idUsuario)
  }

  async createCalendario() {
    this.authService.createCalendario(this.calendario);
  }

  async atualizarCalendario() {
    this.authService.atualizarCalendario(
      this.usuario.idUsuario,
      this.calendario
    );
  }

  async getSintomas() {
    this.sintomasFisicos = (await this.authService.returnSintomas()).filter(
      (sintoma) => sintoma.tipo === 'fisico'
    );
    this.sintomasEmocionais = (await this.authService.returnSintomas()).filter(
      (sintoma) => sintoma.tipo === 'emocional'
    );
  }

  makeEmoji(codigo: any) {
    return String.fromCodePoint(codigo);
  }

  async showCalendarAlert() {
    const alert = await this.alertController.create({
      header: 'Insira as informações para gerar/atualizar seu calendário:',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Salvar',
          role: 'confirm',
          handler: async (data) => {
            this.calendario.inicioCiclo = data.inicioCiclo;
            this.calendario.duracao = Number(data.duracao);

            if (await this.authService.getCalendario(this.usuario.idUsuario)) {
              this.atualizarCalendario();
            } else {
              this.calendario.idUsuario = this.usuario.idUsuario;
              this.createCalendario();
            }
          },
        },
      ],
      inputs: [
        {
          name: 'inicioCiclo',
          type: 'date',
          label: 'Última vez que menstruou:',
          attributes: {
            labelPlacement: 'stacked',
          },
        },
        {
          name: 'duracao',
          type: 'number',
          label: 'Duração:',
          attributes: {
            labelPlacement: 'stacked',
          },
        },
      ],
      cssClass: 'classesuperespecifica',
    });
    await alert.present();
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
            if (this.navH > 0) {
              this.navH--;
              this.showHelpAlert();
            }
          },
          cssClass: this.navH < 1 ? 'disabled' : '',
        },
        {
          text: this.navH === this.helpInfos.length - 1 ? 'Ok' : 'Next',
          role: this.navH === this.helpInfos.length - 1 ? 'confirm' : '',
          handler: () => {
            if (this.navH < this.helpInfos.length - 1) {
              this.navH++;
              this.showHelpAlert();
            } else {
              this.navH = 0;
            }
          },
        },
      ],
    });

    await alert.present();
  }

  calcularFase(dia: any, inicioCiclo: any, duracao: any) {
    const dataAtual = new Date(dia);
    const dataInicioCiclo = new Date(inicioCiclo);

    const diasDesdeInicio = Math.floor((dataAtual.getTime() - dataInicioCiclo.getTime()) / (1000 * 60 * 60 * 24));
    const diaCiclo = ((diasDesdeInicio % 28) + 28) % 28;

    if (diaCiclo >= 0 && diaCiclo <= duracao) {
        // Fase Menstrual
        return `menstrual`;
    } else if (diaCiclo > duracao && diaCiclo < 9) {
        // Fase Lútea Transitória
        return `lutea`;
    }
    else if (diaCiclo === 13) {
      // Ovulação
      return `ovulacao`;
  } else if (diaCiclo >= 9 && diaCiclo <= 14) {
        // Fase Folicular
        return `folicular`;
    } else if (diaCiclo > 14 && diaCiclo < 28) {
        // Fase Lútea
        return 'lutea';
    } else {
        // Ajuste em caso de erro
        return `erro`;
    }
}

  async gerarDias() {
    await this.getCalendarioInfo()
    if (this.calendario.idCalendario) {
      this.diaVs.length = 0;
      const dataAtualizada = new Date(
        this.hoje.getFullYear(),
        this.hoje.getMonth() + this.navM,
        1  
      );
      this.anoAtual = dataAtualizada.getFullYear();
      this.mesAtual = dataAtualizada.getMonth();

      const diasNoMes = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
      const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1).getDay();

      for (let i = 0; i < primeiroDia; i++) {
        this.diaVs.push({ classe: 'nullday' });
      }

      for (let i = 1; i <= diasNoMes; i++) {
        if (i === this.hoje.getDate() && this.navM === 0) {
          this.diaVs.push({
            numero: i,
            fase: this.calcularFase(`${this.anoAtual}-${this.mesAtual + 1}-${i}`, this.calendario.inicioCiclo.slice(0,10), this.calendario.duracao),
            classe: `day  ${this.calcularFase(`${this.anoAtual}-${this.mesAtual + 1}-${i}`, this.calendario.inicioCiclo.slice(0,10), this.calendario.duracao)} hoje`,
            dataZ: `${this.anoAtual}-${this.mesAtual + 1}-${i}`,
          });
        } else {
          this.diaVs.push({
            numero: i,
            fase: this.calcularFase(`${this.anoAtual}-${this.mesAtual + 1}-${i}`, this.calendario.inicioCiclo.slice(0,10), this.calendario.duracao),
            classe: `day ${this.calcularFase(`${this.anoAtual}-${this.mesAtual + 1}-${i}`, this.calendario.inicioCiclo.slice(0,10), this.calendario.duracao)}`,
            dataZ: `${this.anoAtual}-${this.mesAtual + 1}-${i}`,
          });
        }
      }

    } else {
      this.diaVs.length = 0;
    const dataAtualizada = new Date(
      this.hoje.getFullYear(),
      this.hoje.getMonth() + this.navM,
      1
    );
    this.anoAtual = dataAtualizada.getFullYear();
    this.mesAtual = dataAtualizada.getMonth();

    const diasNoMes = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
    const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1).getDay();

    for (let i = 0; i < primeiroDia; i++) {
      this.diaVs.push({ classe: 'nullday' });
    }

    for (let i = 1; i <= diasNoMes; i++) {
      if (i === this.hoje.getDate() && this.navM === 0) {
        this.diaVs.push({
          numero: i,
          classe: 'day hoje',
          dataZ: `${this.anoAtual}-${this.mesAtual + 1}-${i}`,
        });
      } else {
        this.diaVs.push({
          numero: i,
          classe: 'day',
          dataZ: `${this.anoAtual}-${this.mesAtual + 1}-${i}`,
        });
      }
    }

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

  async abrirMenuDia(dia: Dia) {
    await this.getCalendarioInfo()
    if(this.calendario.idCalendario){
    this.diaVClicado = dia;
    this.diaClicado = {}
    this.diasSintomas.length = 0
    this.diaClicado.dataZ = this.diaVClicado.dataZ
    this.menuController.open('menuDia');
    }
    
  }

  definirEmocional(emocional: string){
    this.diaClicado.emocional = emocional
  }
  definirDiaSintoma(sintoma: any){
    if(this.diasSintomas.find((diaSintoma) => diaSintoma.idSintoma === sintoma.idSintoma)){
      const diaSintoma = this.diasSintomas.find((diaSintoma) => diaSintoma.idSintoma === sintoma.idSintoma) || {}
      const index = this.diasSintomas.indexOf(diaSintoma)
      this.diasSintomas.splice(index, 1)
    } else {
      this.diasSintomas.push({idSintoma: sintoma.idSintoma})
    }
  }

  getDiaSintoma(sintoma: any){
    const conferirDia = this.diasSintomas.find((diaSintoma)=> diaSintoma.idSintoma===sintoma.idSintoma)
    
    return (conferirDia ? true : false)
  }

  async salvarDia(){
    this.dias = await this.authService.getDias(this.calendario)
    this.diaClicado.idCalendario = this.calendario.idCalendario
    const day = this.dias.find((dia)=> (new Date(dia.dataZ || '').getTime() === new Date(this.diaClicado.dataZ || '').getTime()) && dia.idCalendario === this.diaClicado.idCalendario)

    if(day){
      this.diaClicado.idDia = day.idDia
      await this.authService.deleteDay(this.diaClicado)
      this.menuController.close('menuDia')
    } else {
      await this.authService.createDia(this.diaClicado, this.diasSintomas)
      this.menuController.close('menuDia')
    }
    

    
    
  }
}
