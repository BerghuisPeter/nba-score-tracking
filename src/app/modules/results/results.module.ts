import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: '',
    component: ResultsComponent
  }
]


@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ResultsModule {
}
