import { Component, inject, input, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Timestamp } from 'rxjs';
import { Comments } from '../comments/comments';
import { RestApiService } from '../../services/rest-api.service';


// type DataPost = {
//   id: number;
//   username: string;
//   caption: string;
//   image_filename: string;
//   created_at: Timestamp<string>;
// }

@Component({
  imports: [MatButtonModule, MatCardModule, MatIconModule, Comments],
  selector: 'app-post',
  styleUrl: './post.css',
  templateUrl: './post.html',
})
export class Post {

  post = input<any | undefined>();

  private readonly restApi = inject(RestApiService);

  liked = signal(false);
  likeCount = signal(0);

  ngOnInit(): void {
    const id = this.post()?.id;
    if (id == null) return;

    this.restApi.countLikes(id).subscribe({
      next: (res) => this.likeCount.set(res.count),
      error: (err) => console.error('No se pudo contar los likes', err),
    });

    this.restApi.doILike(id).subscribe({
      next: (res) => this.liked.set(res.liked),
      error: (err) => console.error('No se pudo leer el like', err),
    });
  }

  toggleLike(): void {
    const id = this.post()?.id;
    if (id == null) return;

    this.restApi.switchLike(id).subscribe({
      next: () => {
        this.liked.update((v) => !v);
        this.likeCount.update((n) => n + (this.liked() ? 1 : -1));
      },
      error: (err) => console.error('No se pudo cambiar el like', err),
    });
  }
}