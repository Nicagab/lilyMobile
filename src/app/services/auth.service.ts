import { Injectable } from '@angular/core';
import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import UsuarioCompleto from '../interfaces/UsuarioCompletoI';
import Telefone from '../interfaces/TelefoneI';
import ApiResponse from '../interfaces/ApiResponseI';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarios: UsuarioSimples[] = [];
  usuarioCompleto: UsuarioCompleto = {};
  usuarioSimples: UsuarioSimples = {};
  api = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) {}

  async getUsuarios() {
    this.usuarios =
      (await this.httpClient
        .get<UsuarioSimples[]>(`${this.api}/usuario`)
        .toPromise()) || [];
  }

  async createUser(user: UsuarioSimples, telefone: Telefone): Promise<void> {
    try {
      const userResponse = await this.httpClient
        .post<ApiResponse>(`${this.api}/usuario`, user)
        .toPromise();

      if (userResponse) {
        telefone.idUsuario = userResponse.insertId;
 
        await this.httpClient
          .post(`${this.api}/telefone`, telefone)
          .toPromise();

        console.log('Usuário e telefone criados com sucesso!');
      } else {
        console.error('Erro: ID do usuário não encontrado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário ou telefone:', error);
    }
  }

  async logar(username: string, senha: string) {
    await this.getUsuarios();

    const usuarioEncontrado = this.usuarios.find(
      (user) => user.username === username && user.senha === senha
    );

    if (usuarioEncontrado) {
      this.usuarioSimples = this.usuarios.filter(
        (user) => user.username == username
      )[0];
    } else {
      console.log('Usuario não encontrado');
    }
  }

  isLogged() {
    if (this.usuarioSimples.idUsuario) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo() {
    return this.usuarioSimples;
  }
}
