import { Timestamp } from "firebase/firestore";

export interface ITable {
  id: string,
  name: string,
  lastAccessed: Timestamp,
  // users: string[],
  users: {
    [key: string]: {
      [key: string]: number;
    };
  };
  leader: string,
  prefs: {
    zip: string,
  },
  expiration: Timestamp,
  numDoneVoting: number;
  description: string,
  date: string,
}

export class Table implements ITable {
  id: string;
  name: string;
  lastAccessed: Timestamp;
  // users: string[];
  users: {
    [key: string]: {
      [key: string]: number;
    };
  };
  leader: string;
  prefs: {
    zip: string;
  };
  expiration: Timestamp;
  numDoneVoting: number;
  description: string;
  date: string;

  constructor(json: ITable) {
      this.id = json.id;
      this.name = json.name;
      this.lastAccessed = (new Timestamp(json.lastAccessed.seconds, json.lastAccessed.nanoseconds));
      this.users = json.users;
      this.leader = json.leader;
      this.prefs = json.prefs;
      this.expiration = (new Timestamp(json.expiration.seconds, json.expiration.nanoseconds));
      this.numDoneVoting = json.numDoneVoting;
      this.date = json.date;
      this.description = json.description;
  };
}


