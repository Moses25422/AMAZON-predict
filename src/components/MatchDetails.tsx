import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Match } from "@/types/match";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, TrendingUp, UserCheck, Shield } from "lucide-react";

interface MatchDetailsProps {
  match: Match | null;
  open: boolean;
  onClose: () => void;
}

export const MatchDetails = ({ match, open, onClose }: MatchDetailsProps) => {
  if (!match) return null;

  const getPlayerStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-accent text-accent-foreground";
      case "injured":
        return "bg-destructive text-destructive-foreground";
      case "suspended":
        return "bg-warning text-warning-foreground";
      case "doubtful":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <div className="flex items-center justify-between">
              <span>{match.homeTeam}</span>
              <span className="text-muted-foreground text-xl mx-4">VS</span>
              <span>{match.awayTeam}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">
              <Activity className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="table">
              <TrendingUp className="w-4 h-4 mr-2" />
              Table
            </TabsTrigger>
            <TabsTrigger value="lineups">
              <Users className="w-4 h-4 mr-2" />
              Lineups
            </TabsTrigger>
            <TabsTrigger value="staff">
              <Shield className="w-4 h-4 mr-2" />
              Staff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Match Prediction Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Prediction:</span>
                  <Badge className="bg-accent text-accent-foreground">{match.prediction}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-semibold text-accent">{match.confidence}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">BTTS:</span>
                  <Badge variant={match.btts ? "default" : "outline"}>
                    {match.btts ? `Yes (${match.bttsOdds})` : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Double Chance:</span>
                  <Badge className="bg-warning text-warning-foreground">
                    {match.doubleChance} ({match.doubleChanceOdds})
                  </Badge>
                </div>
              </div>
            </Card>

            {match.homeStats && match.awayStats && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3 text-primary">{match.homeTeam}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Form:</span>
                        <div className="flex gap-1">
                          {match.homeStats.form.map((result, i) => (
                            <span
                              key={i}
                              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                                result === "W"
                                  ? "bg-accent text-accent-foreground"
                                  : result === "D"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive text-destructive-foreground"
                              }`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Home Record:</span>
                        <span className="font-medium">{match.homeStats.homeRecord}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Goals For/Against:</span>
                        <span className="font-medium">
                          {match.homeStats.goalsFor}/{match.homeStats.goalsAgainst}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clean Sheets:</span>
                        <span className="font-medium">{match.homeStats.cleanSheets}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3 text-secondary">{match.awayTeam}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Form:</span>
                        <div className="flex gap-1">
                          {match.awayStats.form.map((result, i) => (
                            <span
                              key={i}
                              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                                result === "W"
                                  ? "bg-accent text-accent-foreground"
                                  : result === "D"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive text-destructive-foreground"
                              }`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Away Record:</span>
                        <span className="font-medium">{match.awayStats.awayRecord}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Goals For/Against:</span>
                        <span className="font-medium">
                          {match.awayStats.goalsFor}/{match.awayStats.goalsAgainst}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clean Sheets:</span>
                        <span className="font-medium">{match.awayStats.cleanSheets}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {match.headToHead && (
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Head to Head</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Overall Record:</span>
                        <span className="font-medium">
                          {match.headToHead.homeWins}W - {match.headToHead.draws}D -{" "}
                          {match.headToHead.awayWins}L
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last 5 Meetings:</span>
                        <div className="flex gap-1">
                          {match.headToHead.lastMeetings.map((result, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {result}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            {match.homeStats && match.awayStats && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Team</th>
                      <th className="text-center p-2">Pos</th>
                      <th className="text-center p-2">P</th>
                      <th className="text-center p-2">W</th>
                      <th className="text-center p-2">D</th>
                      <th className="text-center p-2">L</th>
                      <th className="text-center p-2">GF</th>
                      <th className="text-center p-2">GA</th>
                      <th className="text-center p-2">GD</th>
                      <th className="text-center p-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-accent/5">
                      <td className="p-2 font-medium">{match.homeTeam}</td>
                      <td className="text-center p-2">{match.homeStats.position}</td>
                      <td className="text-center p-2">{match.homeStats.played}</td>
                      <td className="text-center p-2">{match.homeStats.won}</td>
                      <td className="text-center p-2">{match.homeStats.drawn}</td>
                      <td className="text-center p-2">{match.homeStats.lost}</td>
                      <td className="text-center p-2">{match.homeStats.goalsFor}</td>
                      <td className="text-center p-2">{match.homeStats.goalsAgainst}</td>
                      <td className="text-center p-2">{match.homeStats.goalDifference}</td>
                      <td className="text-center p-2 font-bold text-primary">
                        {match.homeStats.points}
                      </td>
                    </tr>
                    <tr className="border-b border-border hover:bg-accent/5">
                      <td className="p-2 font-medium">{match.awayTeam}</td>
                      <td className="text-center p-2">{match.awayStats.position}</td>
                      <td className="text-center p-2">{match.awayStats.played}</td>
                      <td className="text-center p-2">{match.awayStats.won}</td>
                      <td className="text-center p-2">{match.awayStats.drawn}</td>
                      <td className="text-center p-2">{match.awayStats.lost}</td>
                      <td className="text-center p-2">{match.awayStats.goalsFor}</td>
                      <td className="text-center p-2">{match.awayStats.goalsAgainst}</td>
                      <td className="text-center p-2">{match.awayStats.goalDifference}</td>
                      <td className="text-center p-2 font-bold text-secondary">
                        {match.awayStats.points}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lineups" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {match.homeLineup && (
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                    <UserCheck className="w-5 h-5" />
                    {match.homeTeam}
                  </h4>
                  <div className="space-y-2">
                    {match.homeLineup.map((player, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-card hover:bg-accent/5"
                      >
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.position}</p>
                        </div>
                        <Badge variant="outline" className={getPlayerStatusColor(player.status)}>
                          {player.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {match.awayLineup && (
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-secondary">
                    <UserCheck className="w-5 h-5" />
                    {match.awayTeam}
                  </h4>
                  <div className="space-y-2">
                    {match.awayLineup.map((player, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-card hover:bg-accent/5"
                      >
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.position}</p>
                        </div>
                        <Badge variant="outline" className={getPlayerStatusColor(player.status)}>
                          {player.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {match.homeCoaching && (
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                    <Shield className="w-5 h-5" />
                    {match.homeTeam} Staff
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Manager</p>
                      <p className="font-semibold text-lg">{match.homeCoaching.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Assistant Coaches</p>
                      <div className="space-y-1">
                        {match.homeCoaching.assistants.map((assistant, i) => (
                          <p key={i} className="font-medium">
                            {assistant}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {match.awayCoaching && (
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-secondary">
                    <Shield className="w-5 h-5" />
                    {match.awayTeam} Staff
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Manager</p>
                      <p className="font-semibold text-lg">{match.awayCoaching.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Assistant Coaches</p>
                      <div className="space-y-1">
                        {match.awayCoaching.assistants.map((assistant, i) => (
                          <p key={i} className="font-medium">
                            {assistant}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
