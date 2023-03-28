import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { finalize, Observable, of } from 'rxjs';
import { NbaService } from "../../shared/services/nba.service";
import { Team } from "../../shared/models/team.model";
import { LoaderService } from "../../shared/services/loader.service";

@Injectable({
  providedIn: 'root'
})
export class GetTeamsResolver implements Resolve<Team[]> {

  constructor(private nbaService: NbaService, private loaderService: LoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> {
    this.loaderService.showLoader();
    if (this.nbaService.allTeams.length === 0) {
      return this.nbaService.getAllTeams().pipe(
        finalize(() => this.loaderService.hideLoader())
      );
    }
    return of(this.nbaService.allTeams).pipe(
      finalize(() => this.loaderService.hideLoader())
    );
  }
}
