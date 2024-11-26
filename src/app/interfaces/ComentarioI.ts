interface Comentario{
    idComentario: number;
    texto?: string;
    dataPostagem?: string;
    idUsuario?: number;
    idParceiro?: number;
    idPublicacao?: number;
}

export default Comentario