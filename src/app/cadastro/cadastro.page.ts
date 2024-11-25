import { Component } from '@angular/core';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import Telefone from '../interfaces/TelefoneI';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  constructor(private authService: AuthService, private router: Router) { 
    
  }

  usuario: UsuarioSimples = {}
  telefoneC = ''
  telefone: Telefone = {}

  async ionViewWillEnter(){
    if(await this.authService.isLogged()){
      this.router.navigate(['tabs'])
    }
  }

  criarUsuario(){
    this.usuario.tipo = 'comum'
    this.telefone.ddd = Number(this.telefoneC.slice(0,2))
    this.telefone.numero = Number(this.telefoneC.slice(2))
    this.telefoneC.length === 11 ? this.telefone.tipo = 'celular' : this.telefone.tipo = 'telefone'

    this.authService.createUser(this.usuario, this.telefone)
  }

}
