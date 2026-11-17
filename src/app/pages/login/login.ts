import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RestApiService } from '../../services/rest-api.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormField],
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

  async login() {
    try {
      const result = await firstValueFrom(
        this.api.login(this.username(), this.password())
      );
    } catch (error) {
      console.error('Error during login:', error);
    }
    
    // console.log()
  }
}