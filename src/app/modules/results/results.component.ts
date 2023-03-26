import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  $teamCode: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.$teamCode = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params.get('teamCode'))
        // return api call to nba teams here
        return of(params.get('teamCode'));
      })
    );
  }

}
