import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { TeamSearch } from "../models/team-search.model";
import { Team } from "../models/team.model";
import { GameSearch } from "../models/game-search.model";

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  private baseUrl = 'https://free-nba.p.rapidapi.com';

  private httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  public getAllTeams(): Observable<Team[]> {
    const url = `${this.baseUrl}/teams`;
    return this.httpClient.get<TeamSearch>(url, this.httpOptions).pipe(
      map((responses: TeamSearch) => responses.data)
    );
  }

  public getLatestGameResults(teamId: number): Observable<GameSearch> {
    const today = new Date();
    let last12Days = ``;
    for (let i = 1; i <= 12; i++) {
      const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const formattedDay = day.toISOString().substring(0, 10);
      last12Days += `dates[]=${formattedDay}&`;
    }
    return this.httpClient.get<any>(`${this.baseUrl}/games?page=0&${last12Days}&per_page=12&team_ids[]=${teamId}`, this.httpOptions);
  }
}
