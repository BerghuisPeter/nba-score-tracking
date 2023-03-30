import { Component } from '@angular/core';
import { LoaderService } from "./modules/shared/services/loader.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title: string;
  public isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.title = 'NBA Score Tracking App';
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
