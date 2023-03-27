import { Team } from "./team.model";
import { Meta } from "./meta.model";

export interface TeamSearch {
  data: Team[],
  meta: Meta
}
