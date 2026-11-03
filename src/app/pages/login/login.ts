import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  imports: [MatIconModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatInputModule, FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  protected email = form(signal(''), p => {
    required(p, { message: 'You must enter a value' });
    email(p, { message: 'Not a valid email' });
  });

  private readonly api: RestApiService = inject(RestApiService);

  hide = signal(true);
  username = signal('');
  password = signal('');

  updateUsername(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.username.set(inputElement.value);
  }

  updatePassword(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.password.set(inputElement.value);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    console.log('Username:', this.username());
    console.log('Password:', this.password());
    this.api.login(this.username(), this.password())
  }
}