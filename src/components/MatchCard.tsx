import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Match } from "@/types/match";

interface MatchCardProps {
  match: Match;
  onSelectMatch: (match: Match) => void;
}

export const MatchCard = ({ match, onSelectMatch }: MatchCardProps) => {
  const getPredictionColor = (type: string) => {
    switch (type) {
      case "Home Win":
        return "bg-accent/20 text-accent border-accent/30";
      case "Away Win":
        return "bg-info/20 text-info border-info/30";
      case "BTTS":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Double Chance":
        return "bg-warning/20 text-warning border-warning/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card
      className="p-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-pointer group border-border hover:border-primary/50"
      onClick={() => onSelectMatch(match)}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs">
          {match.league}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{match.time}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">{match.homeTeam}</span>
          <span className="text-2xl font-bold text-primary">{match.homeOdds}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">{match.awayTeam}</span>
          <span className="text-2xl font-bold text-secondary">{match.awayOdds}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Prediction</span>
          <Badge className={getPredictionColor(match.prediction)}>
            {match.prediction}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              {match.confidence}% Confidence
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>

      {match.isMatchOfDay && (
        <div className="mt-3 pt-3 border-t border-border">
          <Badge className="w-full justify-center bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            ⭐ MATCH OF THE DAY
          </Badge>
        </div>
      )}
    </Card>
  );
};
