export interface IUser {
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
  role: string;
}

export enum IRole {
  admin = 'admin'
}
