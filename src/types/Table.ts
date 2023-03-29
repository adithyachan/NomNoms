import { Timestamp } from "firebase/firestore";

export interface ITable {
  id: string,
  name: string,
  lastAccessed: Timestamp,
  users: string[],
  leader: string,
  prefs: {
    zip: string,
    cuisine: string,
  },
  expiration: Timestamp,
}

export class Table implements ITable {
  id: string;
  name: string;
  lastAccessed: Timestamp;
  users: string[];
  leader: string;
  prefs: {
    zip: string;
    cuisine: string;
  };
  expiration: Timestamp;

  constructor(json: ITable) {
      this.id = json.id;
      this.name = json.name;
      this.lastAccessed = (new Timestamp(json.lastAccessed.seconds, json.lastAccessed.nanoseconds));
      this.users = json.users;
      this.leader = json.leader;
      this.prefs = json.prefs;
      this.expiration = (new Timestamp(json.expiration.seconds, json.expiration.nanoseconds));
  };
}


