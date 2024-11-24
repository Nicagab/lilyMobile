import { Component } from '@angular/core';

import Publicacao from '../interfaces/PublicacaoI';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  usuario: UsuarioSimples = {}
  publicacoes: Publicacao[] = []
  publicacao: Publicacao = {}

  constructor(private authService: AuthService) { 
    this.getUserInfo()
    this.getPublicacoes()
  }

  getUserInfo(){
    this.usuario = this.authService.getUserInfo()
  }

  async getPublicacoes(){
    this.publicacoes = await this.authService.getPublicacoes()
  }

  async createPublicacao(){
    this.publicacao.idUsuario = this.usuario.idUsuario
    const dataPostagem = new Date()
    this.publicacao.dataPostagem = `${dataPostagem.getFullYear()}-${dataPostagem.getMonth()+1}-${dataPostagem.getDate()} ${dataPostagem.getHours()}:${dataPostagem.getMinutes()}:${dataPostagem.getSeconds()}`

    await this.authService.createPublicacao(this.publicacao)
    this.publicacao = {}
    this.getPublicacoes()
  }
 
}
