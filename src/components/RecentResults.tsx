import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Result {
  id: string;
  date: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  prediction: string;
  result: "won" | "lost" | "draw";
  confidence: number;
}

const recentResults: Result[] = [
  {
    id: "1",
    date: "2025-10-20",
    league: "Premier League",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    homeScore: 2,
    awayScore: 1,
    prediction: "Home Win",
    result: "won",
    confidence: 82,
  },
  {
    id: "2",
    date: "2025-10-20",
    league: "Bundesliga",
    homeTeam: "RB Leipzig",
    awayTeam: "Bayer Leverkusen",
    homeScore: 1,
    awayScore: 1,
    prediction: "BTTS",
    result: "won",
    confidence: 78,
  },
  {
    id: "3",
    date: "2025-10-19",
    league: "La Liga",
    homeTeam: "Atletico Madrid",
    awayTeam: "Real Sociedad",
    homeScore: 3,
    awayScore: 0,
    prediction: "Home Win",
    result: "won",
    confidence: 75,
  },
  {
    id: "4",
    date: "2025-10-19",
    league: "Serie A",
    homeTeam: "Napoli",
    awayTeam: "Roma",
    homeScore: 2,
    awayScore: 2,
    prediction: "Home Win",
    result: "draw",
    confidence: 70,
  },
  {
    id: "5",
    date: "2025-10-19",
    league: "Ligue 1",
    homeTeam: "Lyon",
    awayTeam: "Monaco",
    homeScore: 1,
    awayScore: 2,
    prediction: "BTTS",
    result: "won",
    confidence: 85,
  },
  {
    id: "6",
    date: "2025-10-18",
    league: "Premier League",
    homeTeam: "Tottenham",
    awayTeam: "West Ham",
    homeScore: 4,
    awayScore: 1,
    prediction: "Home Win",
    result: "won",
    confidence: 80,
  },
];

export const RecentResults = () => {
  const winRate = (recentResults.filter((r) => r.result === "won").length / recentResults.length) * 100;

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Recent Results
          </CardTitle>
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            {winRate.toFixed(0)}% Win Rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">League</TableHead>
                <TableHead className="font-semibold">Match</TableHead>
                <TableHead className="text-center font-semibold">Score</TableHead>
                <TableHead className="font-semibold">Prediction</TableHead>
                <TableHead className="text-center font-semibold">Confidence</TableHead>
                <TableHead className="text-center font-semibold">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map((result) => (
                <TableRow key={result.id} className="border-border/50">
                  <TableCell className="text-muted-foreground">
                    {new Date(result.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{result.league}</TableCell>
                  <TableCell className="font-medium">
                    {result.homeTeam} vs {result.awayTeam}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {result.homeScore} - {result.awayScore}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {result.prediction}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{result.confidence}%</TableCell>
                  <TableCell className="text-center">
                    {result.result === "won" && (
                      <Badge className="bg-success/20 text-success border-success/40 hover:bg-success/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Won
                      </Badge>
                    )}
                    {result.result === "lost" && (
                      <Badge className="bg-destructive/20 text-destructive border-destructive/40 hover:bg-destructive/30">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Lost
                      </Badge>
                    )}
                    {result.result === "draw" && (
                      <Badge variant="outline" className="bg-muted/20 border-muted">
                        <Minus className="w-3 h-3 mr-1" />
                        Draw
                      </Badge>
                    )}
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
