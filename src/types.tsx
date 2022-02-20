// TODO refactore these types
export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  intro: string;
  age: number;
  height: number;
  weight: number;
  image: Blob;
  games: number;
  wins: number;
  loses: number;
  mvps: number;
  elo: number;
  lastSeen: string;
  joiningDate: string;
  sports: string;
};

export type Team = {
  id: string;
  name: string;
  location: string;
  wins: number;
  loses: number;
  elo?: number;
  members: User[];
};
