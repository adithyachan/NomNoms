export interface IUser {
  username?: string,
  tables?: string,
  email?: string,
}

export class User implements IUser {
  username: string;
  tables: string;
  email: string;

  constructor(username: string, tables: string, email: string) {
    this.username = username;
    this.tables = tables;
    this.email = email;
  }
}
