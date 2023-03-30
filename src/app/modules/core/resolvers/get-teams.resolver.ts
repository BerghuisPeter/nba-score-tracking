import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { NbaService } from "../../shared/services/nba.service";
import { Team } from "../../shared/models/team.model";
import { LoaderService } from "../services/loader.service";
import { finalize, of } from "rxjs";

export const GetTeamsResolver: ResolveFn<Team[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const loaderService: LoaderService = inject(LoaderService);
    const nbaService: NbaService = inject(NbaService);
    loaderService.showLoader();

    if (nbaService.allTeams.length === 0) {
      return nbaService.getAllTeams().pipe(
        finalize(() => loaderService.hideLoader())
      );
    }
    return of(nbaService.allTeams).pipe(
      finalize(() => loaderService.hideLoader())
    );
  };
