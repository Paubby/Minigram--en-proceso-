import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiURL = 'http://localhost:3000/';
  private jwtToken = "";
  private http = inject(HttpClient);

  listPosts(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'post/feed');
  }

  // login(username: string, password: string): { success: boolean } {
  //   this.http.post(this.apiURL + 'auth/login', { username, password }).subscribe(
  //     next: (data: any) => {
  //       console.log('Login response:', data);
  //       this.jwtToken = data.token;
  //       console.log('JWT Token:', this.jwtToken);
  //       return { success: true };
  //     },
  //     error: (error) => {
  //       console.error('Login error:', error);
  //       return { success: false };
  //     });
  // }

  login(username: string, password: string): Observable<{ success: boolean }> {
        return this.http.post<{ token: string }>(this.apiURL + '/auth/login', { username, password }).pipe(
            map((data) => {
                console.log('Inicio de sesión exitoso:', data);
                this.jwtToken = data.token;
                console.log('Token JWT guardado:', this.jwtToken);
                return { success: true };
            }),
            catchError((error) => {
                console.error('Error en la solicitud de inicio de sesión:', error);
                return of({ success: false });
            })
        );
    }
}