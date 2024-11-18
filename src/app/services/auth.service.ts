import { Injectable } from '@angular/core';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import UsuarioCompleto from '../interfaces/UsuarioCompletoI';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios: UsuarioSimples[] = []
  usuarioCompleto: UsuarioCompleto = {}
  usuarioSimples: UsuarioSimples = {}
  api = 'http://localhost:3001'

  constructor(private httpClient: HttpClient) {}

  async getUsuarios(){
    await this.httpClient.get(`${this.api}/usuario`).forEach((res) => this.usuarios.push(res))
  }

  logar(username: string, senha: string){
    this.getUsuarios()

    if(this.usuarios.find((user) => user.username === username && user.senha === senha)){
      this.usuarioSimples = this.usuarios.filter((user) => user.username==username)[0]
    } else {
      console.log('Usuario não encontrado')
    }
  }

  isLogged(){
    if(this.usuarioSimples.idUsuario){
      return true
    } else {
      return false
    }
  }

}
