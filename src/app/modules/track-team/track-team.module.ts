import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackTeamComponent } from './track-team.component';
import { TeamCardComponent } from "./components/team-card/team-card.component";
import { LastGamesComponent } from './components/last-games/last-games.component';
import { TrackTeamRouting } from "./track-team.routing";

@NgModule({
  declarations: [
    TrackTeamComponent,
    TeamCardComponent,
    LastGamesComponent
  ],
  imports: [
    CommonModule,
    TrackTeamRouting
  ]
})
export class TrackTeamModule {
}
