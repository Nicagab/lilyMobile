import { Component } from '@angular/core';

import Publicacao from '../interfaces/PublicacaoI';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';

import { AuthService } from '../services/auth.service';

import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  usuario: UsuarioSimples = {}
  publicacoes: Publicacao[] = []
  publicacoesV: any
  usuarios: UsuarioSimples[] = []
  publicacao: Publicacao = {}

  constructor(private authService: AuthService, public router: Router) { 
    this.getPublicacoes()
  }

  async ionViewWillEnter(){
    await this.getUserInfo()
  }

  async getUserInfo(){
    this.usuario = await this.authService.getUserInfo()
  }

  async getPublicacoes(){
    this.usuarios = await this.authService.returnUsuarios()
    const publicacoes = await this.authService.getPublicacoes()
    this.publicacoes = publicacoes.reverse()
    this.publicacoesV = publicacoes
    this.publicacoesV.map((publicacao: any)=> 
    {
    const data = new Date(publicacao.dataPostagem || '')
    const dataCorrigida = data.toDateString().split(' ')
    publicacao.dataPostagem = `${dataCorrigida[2]} ${dataCorrigida[1]} ${dataCorrigida[3]}`
    
    this.usuarios.map((usuario)=>{
      publicacao.idUsuario === usuario.idUsuario ? (publicacao.nomeUsuario = usuario.username, publicacao.tipoUsuario = usuario.tipo || 'parceiro') : null;
    })
  }

    
    )
    
  } 

  async createPublicacao(){
    this.publicacao.idUsuario = this.usuario.idUsuario
    const dataPostagem = new Date()
    this.publicacao.dataPostagem = `${dataPostagem.getFullYear()}-${dataPostagem.getMonth()+1}-${dataPostagem.getDate()} ${dataPostagem.getHours()}:${dataPostagem.getMinutes()}:${dataPostagem.getSeconds()}`

    await this.authService.createPublicacao(this.publicacao)
    this.publicacao = {}
    this.getPublicacoes()
  }

  abrirPublicacao(publicacao: any){
    const navigationExtras: NavigationExtras = {state:{paramPublicacao: publicacao}}
    this.router.navigate(['publicacao'],navigationExtras)
  }
  
}
