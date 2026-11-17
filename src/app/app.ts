import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RestApiService } from './services/rest-api.service';


@Component({
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLinkWithHref, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly restApiService = inject(RestApiService);

  logout(): void{
    this.restApiService.logout();
  }
}
