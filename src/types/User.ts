export interface IUser {
  name: string,
  tables: string[],
}

export class User implements IUser {
  name: string;
  tables: string[];

  constructor(name: string, tables: string[]) {
    this.name = name;
    this.tables = tables;
  }
}
