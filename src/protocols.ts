export type ApplicationError = {
    name: string;
    message: string;
};

export type Pet = {
    nome: string,
    raça: string,
    nascimento: string,
    adotado: boolean,
    descrição: string,
    imagem: string
    contato: string
}

export type RequestError = {
    status: number,
    data: object | null,
    statusText: string,
    name: string,
    message: string,
  };