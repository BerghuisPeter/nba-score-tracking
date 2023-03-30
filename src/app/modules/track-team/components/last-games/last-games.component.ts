import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-last-games',
  templateUrl: './last-games.component.html',
  styleUrls: ['./last-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastGamesComponent {

  @Input() lastGamesWon!: boolean[];
  @Input() averagePointsScored!: number;
  @Input() averagePointsConceded!: number;

}
