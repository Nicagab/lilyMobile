import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import Telefone from '../interfaces/TelefoneI';
import Publicacao from '../interfaces/PublicacaoI';
import Comentario from '../interfaces/ComentarioI';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  usuario: UsuarioSimples = {}
  edicao: UsuarioSimples = {}
  telefones: Telefone[] = []
  publicacoes: Publicacao[] = []
  comentarios: Comentario[] = []
  dataNasc: any
  modoEdicao = false
  opcao = 'config'
  opcao2 = 'publicacoes'

  constructor(private router: Router, private authService: AuthService) { 
    this.redirecionarLogin()
  }

  async ionViewWillEnter(){
    await this.getUserInfo()
    this.dataNasc = this.usuario.dataNasc?.slice(0, 10);
    this.getTelefonesInfo()
    this.getPublicacoes()
  }

  redirecionarLogin(){
    if(!this.authService.isLogged()){
      this.router.navigate(['login'])
    }
  }

  async getUserInfo(){
    this.usuario = await this.authService.getUserInfo()
    
  }

  async getTelefonesInfo(){
    this.telefones = await this.authService.getTelefones(this.usuario)
  }

  habilitarEdicao(){
    this.modoEdicao = true;
  }

  async salvar(){
    await this.authService.updateUser(this.edicao, this.usuario.idUsuario)

    await this.getUserInfo()
    this.dataNasc = this.usuario.dataNasc?.slice(0, 10);
    this.getTelefonesInfo()
    this.modoEdicao = false
  }

  trocar(opcao: string){
    this.opcao = opcao
  }

  trocar2(opcao: string){
    this.opcao2 = opcao
  }

  async getPublicacoes(){
    this.publicacoes = await this.authService.getPublicacoesUser(this.usuario)
  }
}
