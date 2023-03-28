import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackTeamComponent } from './track-team.component';
import { RouterModule } from "@angular/router";
import { TeamCardComponent } from "./components/team-card/team-card.component";

const routes = [
  {
    path: '',
    component: TrackTeamComponent
  }
]

@NgModule({
  declarations: [
    TrackTeamComponent,
    TeamCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackTeamModule {
}
