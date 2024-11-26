import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

import Conteudo from '../interfaces/ConteudoI'
import Imagem from '../interfaces/ImagemI';

import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  constructor(private authService: AuthService, public router: Router) {
    this.getNoticias()
  }
  
  noticias: Conteudo[] = []
  noticiasV: any
  imagens: Imagem[] = []

  async getNoticias(){
    this.noticias = await this.authService.getNoticias()
    this.noticias.reverse()

    this.imagens = await this.authService.getImagens()

    this.noticiasV = this.noticias
    this.noticiasV.map((noticia: any)=> {
      this.imagens.map((imagem)=> {
        imagem.idConteudo === noticia.idConteudo ? noticia.imagem = imagem.caminho : ''
      })
    })
    console.log(this.noticiasV)
  }

  abrirNoticia(noticia: any){
    const navigationExtras: NavigationExtras = {state:{paramNoticia: noticia}}
    this.router.navigate(['noticia'],navigationExtras)
  }
}
