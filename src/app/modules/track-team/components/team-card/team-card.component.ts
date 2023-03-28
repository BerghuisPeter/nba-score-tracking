import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from "../../../shared/models/team.model";
import { NbaService } from "../../../shared/services/nba.service";
import { Observable, tap } from "rxjs";
import { Game } from "../../../shared/models/game.model";
import { APP_PATHS } from "../../../shared/models/app-paths.model";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent implements OnInit {

  @Input() team!: Team;
  @Output() unTrackTeam: EventEmitter<void>;

  public $gameDetails!: Observable<Game[]>;
  public pastResults: boolean[];
  public averagePointsScored!: number;
  public averagePointsConceded!: number;
  public lastGamesWon: boolean[];
  public APP_PATHS = APP_PATHS;

  constructor(private nbaService: NbaService) {
    this.unTrackTeam = new EventEmitter<void>();
    this.pastResults = [];
    this.lastGamesWon = [];
  }

  ngOnInit(): void {
    this.$gameDetails = this.nbaService.getLatestGameResults(this.team.id).pipe(
      tap((games: Game[]) => {
        const points = games.reduce((acc, game) => {
          if (this.playsHome(game)) {
            acc.scored += game.home_team_score;
            acc.conceded += game.visitor_team_score;
            this.lastGamesWon.push(game.home_team_score > game.visitor_team_score);
          } else {
            acc.scored += game.visitor_team_score;
            acc.conceded += game.home_team_score;
            this.lastGamesWon.push(game.home_team_score < game.visitor_team_score);
          }
          return acc;
        }, { scored: 0, conceded: 0 });

        this.averagePointsScored = points.scored / games.length;
        this.averagePointsConceded = points.conceded / games.length;
      })
    )
    ;
  }

  public removeTrackedTeam() {
    this.unTrackTeam.emit();
  }

  private playsHome(game: Game): boolean {
    return game.home_team.id === this.team.id;
  }

}
