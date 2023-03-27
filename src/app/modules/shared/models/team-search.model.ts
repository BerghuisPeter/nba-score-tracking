import { Team } from "./team.model";

export interface TeamSearch {
  data: Team[],
  meta: {
    current_page: number,
    next_page: number,
    per_page: number,
    total_count: number,
    total_pages: number
  }
}
