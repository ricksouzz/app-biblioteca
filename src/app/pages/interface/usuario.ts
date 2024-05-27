export interface Usuario {
  id?: number,
  login: string;
  password: string;
  nome: string;
  roles: Role[];
}

export interface Role {
  id: number;
}