import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackTeamComponent } from './track-team.component';
import { RouterModule } from "@angular/router";
import { TeamCardComponent } from "./components/team-card/team-card.component";
import { LastGamesComponent } from './components/last-games/last-games.component';

const routes = [
  {
    path: '',
    component: TrackTeamComponent
  }
]

@NgModule({
  declarations: [
    TrackTeamComponent,
    TeamCardComponent,
    LastGamesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackTeamModule {
}
