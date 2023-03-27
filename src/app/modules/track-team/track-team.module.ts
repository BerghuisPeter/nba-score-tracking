import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackTeamComponent } from './track-team.component';
import { RouterModule } from "@angular/router";
import { TeamComponent } from './components/team/team.component';

const routes = [
  {
    path: '',
    component: TrackTeamComponent
  }
]

@NgModule({
  declarations: [
    TrackTeamComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackTeamModule {
}
