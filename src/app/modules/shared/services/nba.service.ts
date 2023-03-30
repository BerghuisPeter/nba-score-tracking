import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { TeamSearch } from "../models/team-search.model";
import { Team } from "../models/team.model";
import { GameSearch } from "../models/game-search.model";
import { Game } from "../models/game.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  public trackedTeams$: Observable<Team[]>;
  private readonly baseUrl: string;

  public allTeams: Team[];
  private httpOptions: { headers: HttpHeaders };
  private trackedTeamsSubject: BehaviorSubject<Team[]>;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.RapidAPIHost;
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': environment.rapidAPIKey,
        'X-RapidAPI-Host': environment.RapidAPIHost.replace('https://', '')
      })
    };
    this.allTeams = [];
    this.trackedTeamsSubject = new BehaviorSubject<Team[]>([]);
    this.trackedTeams$ = this.trackedTeamsSubject.asObservable();
  }

  /**
   * Gets all teams from the RapidAPI webservice.
   * It saves the teams locally in this service as well for later retrieval.
   * @return Observable<Team[]>, an observable list of all teams.
   */
  public getAllTeams(): Observable<Team[]> {
    const url = `${this.baseUrl}/teams`;
    return this.httpClient.get<TeamSearch>(url, this.httpOptions).pipe(
      map((responses: TeamSearch) => responses.data),
      tap((teams: Team[]) => this.allTeams = teams)
    );
  }

  /**
   * Gets the last 12 days worth of games of a given team from the RapidAPI webservice.
   * @param teamId, the id of the team we want the latest games from.
   * @return Observable<Game[]>, an observable list of Games played by the team in the last 12 days.
   */
  public getLatestGameResults(teamId: number): Observable<Game[]> {
    const today = new Date();
    let last12Days = ``;
    for (let i = 1; i <= 12; i++) {
      const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const formattedDay = day.toISOString().substring(0, 10);
      last12Days += `dates[]=${formattedDay}&`;
    }
    return this.httpClient.get<any>(`${this.baseUrl}/games?page=0&${last12Days}&per_page=12&team_ids[]=${teamId}`, this.httpOptions).pipe(
      map((responses: GameSearch) => responses.data)
    );
  }

  /**
   * Track a new team and add it to the list of tracked teams.
   * @param teamId team id.
   */
  trackTeam(teamId: string): void {
    const newTrackedTeam = this.allTeams.find((team: Team) => team.id === +teamId)!;
    const currentTrackedTeams = this.trackedTeamsSubject.getValue();
    const updatedTrackList = [...currentTrackedTeams, newTrackedTeam];
    this.trackedTeamsSubject.next(updatedTrackList);
  }

  /**
   * Remove a team from the tracked teams list.
   * @param index index of the team to remove.
   */
  unTrack(index: number): void {
    const currentTrackedTeams = this.trackedTeamsSubject.getValue();
    currentTrackedTeams.splice(index, 1);
    this.trackedTeamsSubject.next(currentTrackedTeams);
  }
}
