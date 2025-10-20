import { Button } from "@/components/ui/button";

export type League = 
  | "all"
  | "premier-league"
  | "la-liga"
  | "bundesliga"
  | "serie-a"
  | "ligue-1"
  | "league-one"
  | "league-two"
  | "national-league";

interface LeagueFilterProps {
  selectedLeague: League;
  onSelectLeague: (league: League) => void;
}

const leagues = [
  { id: "all" as League, name: "All Leagues" },
  { id: "premier-league" as League, name: "Premier League" },
  { id: "la-liga" as League, name: "La Liga" },
  { id: "bundesliga" as League, name: "Bundesliga" },
  { id: "serie-a" as League, name: "Serie A" },
  { id: "ligue-1" as League, name: "Ligue 1" },
  { id: "league-one" as League, name: "League One" },
  { id: "league-two" as League, name: "League Two" },
  { id: "national-league" as League, name: "National League" },
];

export const LeagueFilter = ({ selectedLeague, onSelectLeague }: LeagueFilterProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
      <div className="flex gap-2 min-w-max">
        {leagues.map((league) => (
          <Button
            key={league.id}
            onClick={() => onSelectLeague(league.id)}
            variant={selectedLeague === league.id ? "default" : "outline"}
            className="whitespace-nowrap"
          >
            {league.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
