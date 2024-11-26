import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

import Conteudo from '../interfaces/ConteudoI'

import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthService, public router: Router) {
    this.getArtigos()
  }

  pesquisa = ''
  artigos: Conteudo[] = []
  artigosF: Conteudo[] = []

  async getArtigos(){
    this.artigos = await this.authService.getArtigos()
    this.artigos.reverse()
  }

  getArtigosF(){
    this.artigosF = this.artigos.filter((data) => data.titulo?.toLowerCase().match(new RegExp(this.pesquisa.toLowerCase())))
  }

  abrirArtigo(artigo: any){
    const navigationExtras: NavigationExtras = {state:{paramArtigo: artigo}}
    this.router.navigate(['artigo'],navigationExtras)
  }
}
