/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

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
  profileImagePath: string;
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
  TeamMember: User[];
};
