import { useState } from "react";
import { Header } from "@/components/Header";
import { LeagueFilter, League } from "@/components/LeagueFilter";
import { MatchCard } from "@/components/MatchCard";
import { MatchDetails } from "@/components/MatchDetails";
import { RecentResults } from "@/components/RecentResults";
import { PredictionsTable } from "@/components/PredictionsTable";
import { mockMatches } from "@/data/mockMatches";
import { Match } from "@/types/match";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type DateFilter = "previous" | "today" | "next";

const Index = () => {
  const [selectedLeague, setSelectedLeague] = useState<League>("all");
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const filteredMatches = mockMatches.filter((match) => {
    const matchDate = new Date(match.date);
    matchDate.setHours(0, 0, 0, 0);
    
    let dateMatch = false;
    if (dateFilter === "previous") {
      dateMatch = matchDate < today;
    } else if (dateFilter === "today") {
      dateMatch = matchDate.getTime() === today.getTime();
    } else if (dateFilter === "next") {
      dateMatch = matchDate > today;
    }
    
    const leagueMatch =
      selectedLeague === "all" ||
      match.league.toLowerCase().replace(/\s+/g, "-") === selectedLeague;
    
    return dateMatch && leagueMatch;
  });

  const matchOfDay = mockMatches.find((m) => m.isMatchOfDay);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 border border-primary/30">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Premium Football Predictions
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Get expert predictions with high confidence ratings for top European leagues. 
              Detailed statistics, lineups, and probabilities for informed betting decisions.
            </p>
          </div>
        </section>

        {/* Match of the Day */}
        {matchOfDay && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h2 className="text-2xl font-bold">Match of the Day</h2>
            </div>
            <MatchCard match={matchOfDay} onSelectMatch={setSelectedMatch} />
          </section>
        )}

        {/* Recent Results */}
        <section>
          <RecentResults />
        </section>

        {/* All Predictions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h2 className="text-2xl font-bold">All Predictions</h2>
            </div>
            <div className="flex gap-2">
              <Button
                variant={dateFilter === "previous" ? "default" : "outline"}
                onClick={() => setDateFilter("previous")}
              >
                Previous
              </Button>
              <Button
                variant={dateFilter === "today" ? "default" : "outline"}
                onClick={() => setDateFilter("today")}
              >
                Today
              </Button>
              <Button
                variant={dateFilter === "next" ? "default" : "outline"}
                onClick={() => setDateFilter("next")}
              >
                Next
              </Button>
            </div>
          </div>
          <LeagueFilter selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague} />
          <PredictionsTable matches={filteredMatches} onSelectMatch={setSelectedMatch} />
        </section>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No matches found for {selectedLeague}
            </p>
          </div>
        )}
      </main>

      <MatchDetails
        match={selectedMatch}
        open={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
};

export default Index;
