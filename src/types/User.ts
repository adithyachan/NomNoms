export interface IUser {
  username?: string,
  tables?: string,
  uid?: string,
  email?: string,
}

export class User implements IUser {
  username: string;
  tables: string;
  uid: string;
  email: string;

  constructor(username: string, tables: string, uid: string, email: string) {
    this.username = username;
    this.tables = tables;
    this.uid = uid;
    this.email = email;
  }
}
