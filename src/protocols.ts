export type ApplicationError = {
    name: string;
    message: string;
};

export type User = {
    nome: string,
    email: string,
    senha: string,
    confirmarSenha: string,
    cpf: string
}

export type UserLogin = Partial<User>;

export type Pet = {
    nome: string,
    raca: string,
    nascimento: string,
    adotado: boolean,
    descricao: string,
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