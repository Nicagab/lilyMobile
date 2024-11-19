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

  async getUsuarios() {
    this.usuarios = await this.httpClient.get<UsuarioSimples[]>(`${this.api}/usuario`).toPromise() || []
  }

  async logar(username: string, senha: string){
    await this.getUsuarios()

    const usuarioEncontrado = this.usuarios.find((user) => user.username === username && user.senha === senha)

    if(usuarioEncontrado){
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

  getUserInfo(){
    return this.usuarioSimples;
  }

}
