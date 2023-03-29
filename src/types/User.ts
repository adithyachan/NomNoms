export interface IUser {
  username: string,
  tables: string[],
  uid: string,
  email: string,
}

export class User implements IUser {
  username: string;
  tables: string[];
  uid: string;
  email: string;

  constructor(data: IUser) {
    this.username = data.username;
    this.tables = data.tables;
    this.uid = data.uid;
    this.email = data.email;
  }
}
