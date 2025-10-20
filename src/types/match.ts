export interface Player {
  name: string;
  position: string;
  status: "available" | "injured" | "suspended" | "doubtful";
}

export interface CoachingStaff {
  manager: string;
  assistants: string[];
}

export interface TeamStats {
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  homeRecord: string;
  awayRecord: string;
  cleanSheets: number;
  failedToScore: number;
}

export interface Match {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
  prediction: string;
  confidence: number;
  btts: boolean;
  bttsOdds: string;
  doubleChance: string;
  doubleChanceOdds: string;
  isMatchOfDay?: boolean;
  homeStats?: TeamStats;
  awayStats?: TeamStats;
  homeLineup?: Player[];
  awayLineup?: Player[];
  homeCoaching?: CoachingStaff;
  awayCoaching?: CoachingStaff;
  headToHead?: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMeetings: string[];
  };
}
