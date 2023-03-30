import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ResultsComponent } from "./results.component";

const routes = [
  {
    path: '',
    component: ResultsComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResultsRouting {
}
