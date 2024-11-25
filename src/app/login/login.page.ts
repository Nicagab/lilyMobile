import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  username = ''
  senha = ''

  constructor(private authService: AuthService, private router: Router) {}

  async ionViewWillEnter(){
    if(await this.authService.isLogged()){
      this.router.navigate(['tabs'])
    }
  }
  async login(){
    await this.authService.logar(this.username, this.senha)
    if(await this.authService.isLogged()){
      this.router.navigate(['tabs'])
    }
  }
}
