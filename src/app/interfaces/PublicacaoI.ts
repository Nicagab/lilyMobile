interface Publicacao{
    idPublicacao?: number;
    titulo?: string;
    texto?: string;
    dataPostagem?: string;
    idUsuario?: number;
    idParceiro?: number;
}

export default Publicacao