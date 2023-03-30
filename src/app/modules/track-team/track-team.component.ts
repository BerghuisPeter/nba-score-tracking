import { Component, OnInit } from '@angular/core';
import { NbaService } from "../shared/services/nba.service";
import { Team } from "../shared/models/team.model";

@Component({
  selector: 'app-track-team',
  templateUrl: './track-team.component.html',
  styleUrls: ['./track-team.component.scss']
})
export class TrackTeamComponent implements OnInit {

  public allTeams: Team[];

  constructor(public nbaService: NbaService) {
    this.allTeams = [];
  }

  ngOnInit(): void {
    this.allTeams = this.nbaService.allTeams;
  }

  public trackTeam(teamId: string) {
    this.nbaService.trackTeam(teamId);
  }

  public unTrackTeam(index: number) {
    this.nbaService.unTrack(index);
  }

  public trackByFn(index: number, team: Team) {
    return team.id;
  }

}
