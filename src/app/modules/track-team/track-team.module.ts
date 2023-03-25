import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackTeamComponent } from './track-team.component';
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: '',
    component: TrackTeamComponent
  }
]

@NgModule({
  declarations: [
    TrackTeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackTeamModule {
}
