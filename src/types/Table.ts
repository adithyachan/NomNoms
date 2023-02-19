import { Timestamp } from "firebase/firestore";

export interface ITable {
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

  constructor(json?: ITable, name?: string, lastAccessed?: Timestamp, users?: string[], leader?: string, expiration?: Timestamp) {
    if (json) {
      this.name = json.name;
      this.lastAccessed = (new Timestamp(json.lastAccessed.seconds, json.lastAccessed.nanoseconds));
      this.users = json.users;
      this.leader = json.leader;
      this.expiration = (new Timestamp(json.expiration.seconds, json.expiration.nanoseconds));
    }
    else if (name && lastAccessed && users && leader && expiration) {
      this.name = name;
      this.lastAccessed = lastAccessed;
      this.users = users;
      this.leader = leader;
      this.expiration = expiration;
    }
    else {
      this.name = "";
      this.lastAccessed = Timestamp.fromDate(new Date());
      this.users = [];
      this.leader = "";
      this.expiration = Timestamp.fromDate(new Date());
    }
  };
}


