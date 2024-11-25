import { Injectable } from '@angular/core';

import UsuarioSimples from '../interfaces/UsuarioSimplesI';
import UsuarioCompleto from '../interfaces/UsuarioCompletoI';
import Telefone from '../interfaces/TelefoneI';
import ApiResponse from '../interfaces/ApiResponseI';
import Sintoma from '../interfaces/SintomaI';
import Calendario from '../interfaces/CalendarioI'
import Dia from '../interfaces/DiaI';
import Conteudo from '../interfaces/ConteudoI'
import Publicacao from '../interfaces/PublicacaoI';
import DiaSintoma from '../interfaces/DiaSintomaI';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarios: UsuarioSimples[] = [];
  sintomas: Sintoma[] = [];
  dias: Dia[] = []
  usuarioCompleto: UsuarioCompleto = {};
  usuarioSimples: UsuarioSimples = {};
  api = 'http://localhost:3001';
  storage: Storage | null = null

  constructor(private httpClient: HttpClient, private router: Router, private _storage: Storage) {
    this.createStorage()
  }

  async createStorage(){
    const storage = await this._storage.create()
    this.storage = storage
  }

  async getUsuarios() {
    this.usuarios =
      (await this.httpClient
        .get<UsuarioSimples[]>(`${this.api}/usuario`)
        .toPromise()) || [];
  }

  async getSintomas() {
    this.sintomas =
      (await this.httpClient
        .get<Sintoma[]>(`${this.api}/sintoma`)
        .toPromise()) || [];
  }

  async returnSintomas(){
    await this.getSintomas()
    return this.sintomas
  }

  async createUser(user: UsuarioSimples, telefone: Telefone): Promise<void> {
    try {
      const userResponse = await this.httpClient
        .post<ApiResponse>(`${this.api}/usuario`, user)
        .toPromise();

      if (userResponse) {
        telefone.idUsuario = userResponse.insertId;

        const telefoneResponse = await this.httpClient
          .post(`${this.api}/telefone`, telefone)
          .toPromise();

        console.log('Usuário e telefone criados com sucesso!');
      } else {
        console.error('Erro: ID do usuário não encontrado na resposta.');
      }

      await this.logar(user.username, user.senha);
      if (await this.isLogged()) {
        this.router.navigate(['tabs']);
      }
    } catch (error) {
      console.error('Erro ao criar usuário ou telefone:', error);
    }
  }

  async logar(username: any, senha: any) {
    await this.getUsuarios();
    this.usuarioSimples = {};

    const usuarioEncontrado = this.usuarios.find(
      (user) => user.username === username && user.senha === senha
    );

    if (usuarioEncontrado) {
      this.usuarioSimples = this.usuarios.filter(
        (user) => user.username == username
      )[0];

      this.storage?.set('usuario', this.usuarioSimples)
    } else {
      console.log('Usuario não encontrado');
    }
  }

  async isLogged() {
    if (await this.storage?.get('usuario')) {
      return true;
    } else {
      return false;
    }
  }

  async getUserInfo() {
    const data = await this.storage?.get('usuario')
    return data
  }

  async createCalendario(calendario: Calendario){
    try{
      await this.httpClient.post(`${this.api}/calendario`, calendario).toPromise()
    } catch (error){
      console.log(error)
    }
  }

  async atualizarCalendario(id: any, calendar: any){
    try{
      const calendarios = await this.httpClient.get<Calendario[]>(`${this.api}/calendario`).toPromise() || []
      const calendario = calendarios.find((data) => data.idUsuario === id) 

      await this.httpClient.put(`${this.api}/calendario/${calendario?.idCalendario}`, calendar).toPromise()
    } catch (error){
      console.error(error)
    }
  }

  async getCalendario(id: any){
    const calendarios = await this.httpClient.get<Calendario[]>(`${this.api}/calendario`).toPromise() || []
    const calendario = calendarios.find((calendar) => calendar.idUsuario === id) || false

    if(calendario){
      return true
    } else {
      return false
    }
  }

   async returnCalendario(id: any){
    const calendarios = await this.httpClient.get<Calendario[]>(`${this.api}/calendario`).toPromise() || []
    const calendario = calendarios.find((calendar) => calendar.idUsuario === id) || {}

    return calendario;
   }

   async createDia(dia: any, diasSintomas: any){
    const diaResponse = await this.httpClient.post<ApiResponse>(`${this.api}/dia`, dia).toPromise()

    if(diaResponse && diasSintomas.length>0){
      diasSintomas.map(async(diaSintoma: any) => {
        diaSintoma.idDia = diaResponse.insertId
        await this.httpClient.post(`${this.api}/diaSintoma`, diaSintoma).toPromise()
      })
    }
   }

   async deleteDay(dia: any) {
    try {
      const diaResponse = await this.httpClient.delete<ApiResponse>(`${this.api}/dia/${dia.idDia}`).toPromise();
      if (diaResponse) {
        const diasSintomas = await this.httpClient.get<DiaSintoma[]>(`${this.api}/diaSintoma`).toPromise() || [];
        const diasSintomaFilter = diasSintomas.filter((diaSintoma) => diaSintoma.idDia === dia.idDia);
  
        for (const diaSintoma of diasSintomaFilter) {
          await this.httpClient.delete(`${this.api}/diaSintoma/${diaSintoma.idDiaSintoma}`).toPromise();
        }
      }
    } catch (error) {
      console.error("Erro ao deletar dia:", error);
    }
  }

   async getDias(calendario: any){
    const dias = await this.httpClient.get<Dia[]>(`${this.api}/dia`).toPromise() || []
    this.dias = dias.filter((dia)=> dia.idCalendario === calendario.idCalendario)
    return this.dias
   }

   async getArtigos(){
    const artigos = await this.httpClient.get<Conteudo[]>(`${this.api}/conteudo/tipo/artigo`).toPromise() || []

    return artigos
   }

   async getPublicacoes(){
    const publicacoes = await this.httpClient.get<Publicacao[]>(`${this.api}/publicacao`).toPromise() || []

    return publicacoes
   }

   async createPublicacao(publicacao: Publicacao){
    try{
      await this.httpClient.post(`${this.api}/publicacao`, publicacao).toPromise()
    } catch (error){
      console.error(error)
    }
   }
}
