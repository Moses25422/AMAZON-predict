import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye } from "lucide-react";
import { Match } from "@/types/match";
import { parseYMDToLocalDate } from "@/lib/utils";
interface PredictionsTableProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export const PredictionsTable = ({ matches, onSelectMatch }: PredictionsTableProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-success/20 text-success border-success/40";
    if (confidence >= 70) return "bg-primary/20 text-primary border-primary/40";
    return "bg-warning/20 text-warning border-warning/40";
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Today's Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Time</TableHead>
                <TableHead className="font-semibold">League</TableHead>
                <TableHead className="font-semibold">Match</TableHead>
                <TableHead className="font-semibold">Prediction</TableHead>
                <TableHead className="text-center font-semibold">Confidence</TableHead>
                <TableHead className="font-semibold">Odds</TableHead>
                <TableHead className="text-center font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id} className="border-border/50">
                  <TableCell className="text-muted-foreground">
                    {parseYMDToLocalDate(match.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-medium">
                    {match.time}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{match.league}</TableCell>
                  <TableCell className="font-medium">
                    {match.homeTeam} vs {match.awayTeam}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {match.prediction}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={getConfidenceColor(match.confidence)}>
                      {match.confidence}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 text-xs">
                      <span className="text-muted-foreground">H: {match.homeOdds}</span>
                      <span className="text-muted-foreground">D: {match.drawOdds}</span>
                      <span className="text-muted-foreground">A: {match.awayOdds}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectMatch(match)}
                      className="hover:bg-primary/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
