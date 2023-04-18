import { Timestamp } from "firebase/firestore";

export interface ITable {
  id: string,
  name: string,
  lastAccessed: Timestamp,
  banned: string[],
  users: {
    [key: string]: {
      [key: string]: number;
    };
  };
  leader: string,
  prefs: {
    zip: string,
    cuisine: string,
    price: string,
  },
  expiration: Timestamp,
  description: string,
  date: Date,
  numDoneVoting: number,
  prefsDone: string[],
}

export class Table implements ITable {
  id: string;
  name: string;
  lastAccessed: Timestamp;
  banned: string[];
  users: {
    [key: string]: {
      [key: string]: number;
    };
  };
  leader: string;
  prefs: {
    zip: string;
    cuisine: string;
    price: string;
  };
  expiration: Timestamp;
  numDoneVoting: number;
  description: string;
  date: Date;
  prefsDone: string[];

  constructor(json: ITable) {
      this.id = json.id;
      this.name = json.name;
      this.lastAccessed = (new Timestamp(json.lastAccessed.seconds, json.lastAccessed.nanoseconds));
      this.banned = json.banned;
      this.users = json.users;
      this.leader = json.leader;
      this.prefs = json.prefs;
      this.expiration = (new Timestamp(json.expiration.seconds, json.expiration.nanoseconds));
      this.numDoneVoting = json.numDoneVoting;
      this.description = json.description;
      this.date = json.date;
      this.prefsDone = json.prefsDone;
  };
}


