// LATER refactor these types
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
  avatarUrl?: string;
  games: number;
  wins: number;
  loses: number;
  mvps: number;
  elo: number;
  createdAt: string;
  sports: string;
};

export type Team = {
  id: string;
  name: string;
  location: string;
  wins: number;
  loses: number;
  logoUrl?: string;
  elo?: number;
  members: (User & { role: 'captain' | 'member' })[];
};

export type Fixture = {
  id: string;
  datetime: string;
  status: string;
  teamA: Team;
  teamB: Team;
};

export type Matchup = {
  id: string;
  datetime: string;
  status: string;
  teamA: Team;
  teamB: Team;
  teamAScore: string;
  teamBScore: string;
  mvp: User;
};
