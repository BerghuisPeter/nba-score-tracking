import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Team } from "../../../shared/models/team.model";
import { NbaService } from "../../../shared/services/nba.service";
import { Observable, tap } from "rxjs";
import { GameSearch } from "../../../shared/models/game-search.model";
import { Game } from "../../../shared/models/game.model";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent implements OnInit {

  $gameDetails!: Observable<GameSearch>;
  pastResults: boolean[];
  averagePointsScored: number | undefined;
  averagePointsConceded: number | undefined;

  @Input() team!: Team;

  constructor(private nbaService: NbaService) {
    this.pastResults = [];
  }

  ngOnInit(): void {
    this.$gameDetails = this.nbaService.getLatestGameResults(this.team.id).pipe(
      tap((gameSearch: GameSearch) => {
        const points = gameSearch.data.reduce((acc, game) => {
          if (this.playsHome(game)) {
            acc.scored += game.home_team_score;
            acc.conceded += game.visitor_team_score;
          } else {
            acc.scored += game.visitor_team_score;
            acc.conceded += game.home_team_score;
          }
          return acc;
        }, { scored: 0, conceded: 0, win: true });

        this.averagePointsScored = points.scored / gameSearch.data.length;
        this.averagePointsConceded = points.conceded / gameSearch.data.length;
      })
    )
    ;
  }

  public playsHome(game: Game): boolean {
    return game.home_team.id === this.team.id;
  }

}
