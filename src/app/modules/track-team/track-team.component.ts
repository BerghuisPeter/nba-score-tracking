import { Component } from '@angular/core';
import { NbaService } from "../shared/services/nba.service";
import { Team } from "../shared/models/team.model";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-track-team',
  templateUrl: './track-team.component.html',
  styleUrls: ['./track-team.component.scss']
})
export class TrackTeamComponent {

  $teams: Observable<Team[]>;
  allTeams: Team[];
  trackedTeams: Team[];

  constructor(public nbaService: NbaService, private httpClient: HttpClient) {
    this.allTeams = [];
    this.trackedTeams = [];

    this.$teams = this.nbaService.getAllTeams().pipe(
      tap((response: Team[]) => {
          this.allTeams = response;
          // TODO remove once developpment complete
          this.trackedTeams = [this.allTeams[0]];
        }
      )
    );
  }

  public trackTeam(teamId: string) {
    const selectedTeam = this.allTeams.find(team => team.id === +teamId);
    this.trackedTeams.push(selectedTeam!);
  }

  trackByFn(index: number, team: Team) {
    return team.id;
  }

}
