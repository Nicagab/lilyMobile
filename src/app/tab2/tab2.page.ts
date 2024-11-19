import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private authService: AuthService) {
    this.getUserInfo()
  }

  usuario: UsuarioSimples = {}

  getUserInfo(){
    this.usuario = this.authService.getUserInfo()
    console.log(this.usuario)
  }
}
