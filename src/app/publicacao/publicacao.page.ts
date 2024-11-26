import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';

import Comentario from '../interfaces/ComentarioI';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.page.html',
  styleUrls: ['./publicacao.page.scss'],
})
export class PublicacaoPage implements OnInit {

  publicacao: any
  comentarios: Comentario[] = []
  comentariosV: any
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async(params) => {
      const getNav = this.router.getCurrentNavigation()
      if(getNav?.extras.state){
        this.publicacao = getNav?.extras.state?.['paramPublicacao']
        console.log(this.publicacao)
      }
      if(this.publicacao){
        this.comentarios = await this.authService.getComentarios(this.publicacao)
        this.comentariosV = this.comentarios
      }
    })
  }

}
