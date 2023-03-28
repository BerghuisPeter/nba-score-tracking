import { Component } from '@angular/core';
import { LoaderService } from "./modules/shared/services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NBA Score Tracking App';
  isLoading$ = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {
  }
}
