import { Timestamp } from "firebase/firestore";

export interface ITable {
  name: string,
  lastAccessed: Timestamp,
  users: string[],
  leader: string,
  prefs: {
    zip: string,
    price: string,
    cuisine: string,
  },
  expiration: Timestamp,
}

export class Table implements ITable {
  name: string;
  lastAccessed: Timestamp;
  users: string[];
  leader: string;
  prefs: {
    zip: string;
    price: string;
    cuisine: string;
  };
  expiration: Timestamp;

  constructor(json: ITable) {
      this.name = json.name;
      this.lastAccessed = (new Timestamp(json.lastAccessed.seconds, json.lastAccessed.nanoseconds));
      this.users = json.users;
      this.leader = json.leader;
      this.prefs = json.prefs;
      this.expiration = (new Timestamp(json.expiration.seconds, json.expiration.nanoseconds));
  };
}


