import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import Topico from '../interfaces/TopicoI';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  noticia: any
  topicos: Topico[] = []
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async(params) => {
      const getNav = this.router.getCurrentNavigation()
      if(getNav?.extras.state){
        this.noticia = getNav?.extras.state?.['paramNoticia']
      }
      if(this.noticia){
        this.topicos = await this.authService.getTopicos(this.noticia)
        console.log(this.topicos)
      }
    })
  }

}
