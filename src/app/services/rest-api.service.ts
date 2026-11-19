import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    private apiURL = 'http://localhost:3000/';
    private jwtTokenKey = "jwtTocken";
    private usernameKey = 'username';
    private http = inject(HttpClient);

    isLoggedIn = signal<boolean>(false);

    listPosts(): Observable<any> {

        return this.http.get<any>(this.apiURL + 'post/feed', { headers: { 'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}` } });
    }

    login(username: string, password: string): Observable<any> {
        console.log('attempting login with username:', username, 'and password:', password)
        return this.http.post<any>(this.apiURL + 'auth/login', { username, password }).pipe(
            tap((response?) => {
                if (response?.token) {
                    console.log('Inicio de sesión exitoso:', response);
                    localStorage.setItem(this.jwtTokenKey, response.token)
                    localStorage.setItem(this.usernameKey, username)
                    console.log('Token JWT guardado en localStorage:', response.token);
                    this.isLoggedIn.set(true);
                }
            })
        );
    }

    logout() {
        console.log('Cerrando sesión:');
        localStorage.removeItem(this.jwtTokenKey);
        localStorage.removeItem(this.usernameKey);
        this.isLoggedIn.set(false);
    }

    getUsername(): string | null {
        return localStorage.getItem(this.usernameKey);
    }

    createComment(postId: string, commentText: string){
        console.log('Creating comment ' + commentText + 'para el id ' + postId);
        return this.http.post(this.apiURL + `comment/createPost/${postId}`, { content: commentText }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}`
            }
        });
    }

    listComments(postId: string): Observable<any> {
        return this.http.get<any>(this.apiURL + `comment/list/${postId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}` } });
    }

    deleteComment(commentId: number): Observable<any> {
        return this.http.delete<any>(this.apiURL + `comment/delete/${commentId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}` } });
    }

    countLikes(postId: number): Observable<any> {
        return this.http.get<any>(this.apiURL + `like/count/${postId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}` } });
    }

    doILike(postId: number): Observable<any> {
        return this.http.get<any>(this.apiURL + `like/doILike/${postId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}` } });
    }

    switchLike(postId: number): Observable<any> {
        return this.http.post<any>(this.apiURL + `like/switch-like/${postId}`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem(this.jwtTokenKey)}` } });
    }
}