import { Timestamp } from "firebase/firestore";

export interface ITable {
  id: string,
  name: string,
  lastAccessed: any,
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
  expiration: any,
  description: string,
  date: any,
  // numDoneVoting: number,
  usersDoneVoting: string[]
  prefsDone: string[],
  restaurantList: any[],
  recommendation: string,
}

export class Table implements ITable {
  id: string;
  name: string;
  lastAccessed: any;
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
  expiration: any;
  // numDoneVoting: number;
  usersDoneVoting: string[];
  description: string;
  date: any;
  prefsDone: string[];
  restaurantList: any[];
  recommendation: string;

  constructor(json: ITable | undefined) {
      if (!json) {
        throw undefined
      }
      this.id = json.id;
      this.name = json.name;
      this.lastAccessed = (new Timestamp(json.lastAccessed.seconds, json.lastAccessed.nanoseconds));
      this.banned = json.banned;
      this.users = json.users;
      this.leader = json.leader;
      this.prefs = json.prefs;
      this.expiration = (new Timestamp(json.expiration.seconds, json.expiration.nanoseconds));
      // this.numDoneVoting = json.numDoneVoting;
      this.usersDoneVoting = json.usersDoneVoting;
      this.date = json.date;
      this.description = json.description;
      this.prefsDone = json.prefsDone;
      this.restaurantList = json.restaurantList;
      this.recommendation = json.recommendation;
  };
}


