import { Timestamp } from "firebase/firestore";

interface ITable {
  name: string,
  lastAccessed: Timestamp,
  users: string[],
  leader: string,
  expiration: Timestamp,
}

export class Table implements ITable {
  name: string;
  lastAccessed: Timestamp;
  users: string[];
  leader: string;
  expiration: Timestamp;

  constructor(name: string, lastAccessed: Timestamp, users: string[], leader: string, expiration: Timestamp) {
    this.name = name;
    this.lastAccessed = lastAccessed;
    this.users = users;
    this.leader = leader;
    this.expiration = expiration;
  }
}


