import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, switchMap, tap } from "rxjs";
import { NbaService } from "../shared/services/nba.service";
import { Team } from "../shared/models/team.model";
import { Game } from "../shared/models/game.model";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  $gamesResults!: Observable<Game[]>;
  teamCode!: string;
  team!: Team;

  constructor(
    private route: ActivatedRoute,
    private nbaService: NbaService
  ) {
  }

  ngOnInit() {
    this.$gamesResults = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.teamCode = params.get('teamCode')!;
        // return api call to nba teams here
        // return of(this.teamCode);
        return this.nbaService.getLatestGameResults(+this.teamCode).pipe(
          tap((games: Game[]) => {
            if (games[0].home_team.id === +this.teamCode) {
              this.team = games[0].home_team;
            } else {
              this.team = games[0].visitor_team;
            }
          })
        );
      })
    );
  }

}
