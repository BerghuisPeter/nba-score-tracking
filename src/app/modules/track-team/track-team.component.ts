import { Component } from '@angular/core';
import { NbaService } from "../shared/services/nba.service";
import { Team } from "../shared/models/team.model";

@Component({
  selector: 'app-track-team',
  templateUrl: './track-team.component.html',
  styleUrls: ['./track-team.component.scss']
})
export class TrackTeamComponent {

  constructor(public nbaService: NbaService) {
  }

  public trackTeam(teamId: string) {
    const selectedTeam = this.nbaService.allTeams.find(team => team.id === +teamId);
    this.nbaService.trackedTeams.push(selectedTeam!);
  }

  public unTrackTeam(index: number) {
    this.nbaService.trackedTeams.splice(index, 1);
  }

  trackByFn(index: number, team: Team) {
    return team.id;
  }

}
