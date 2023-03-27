import { Meta } from "./meta.model";
import { Game } from "./game.model";

export interface GameSearch {
  data: Game[],
  meta: Meta
}
