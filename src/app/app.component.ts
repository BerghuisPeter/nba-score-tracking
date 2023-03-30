import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { LoaderService } from "./modules/core/services/loader.service";

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
