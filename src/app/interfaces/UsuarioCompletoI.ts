import UsuarioSimples from "./UsuarioSimplesI";

interface UsuarioCompleto {
  userInfo?: UsuarioSimples,
  telefones?: Array<Object>,
  foto?: Array<Object>,
  publicacoes?: Array<Object>,
  comentarios?: Array<Object>,
  artigos?: Array<Object>,
  noticias?: Array<Object>,
}

export default UsuarioCompleto
