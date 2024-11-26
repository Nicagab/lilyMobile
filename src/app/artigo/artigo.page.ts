import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Topico from '../interfaces/TopicoI';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.page.html',
  styleUrls: ['./artigo.page.scss'],
})
export default class ArtigoPage implements OnInit {

  artigo: any
  topicos: Topico[] = []
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async(params) => {
      const getNav = this.router.getCurrentNavigation()
      if(getNav?.extras.state){
        this.artigo = getNav?.extras.state?.['paramArtigo']
      }
      if(this.artigo){
        this.topicos = await this.authService.getTopicos(this.artigo)
        console.log(this.topicos)
      }
    })
  }

}
