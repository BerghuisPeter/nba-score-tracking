import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { NbaService } from "../../shared/services/nba.service";
import { Team } from "../../shared/models/team.model";

export const GetTeamsResolver: ResolveFn<Team[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(NbaService).getAllTeams();
  };
