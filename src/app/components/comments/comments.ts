import { Component, inject, input, Input, signal } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, filter, combineLatest } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatIcon, MatButtonModule],
  selector: 'app-comments',
  styleUrl: './comments.css',
  templateUrl: './comments.html',
})
export class Comments {
  postId = input(" ");
  private readonly reloadTrigger = signal(0);
  private readonly restApiService = inject(RestApiService);

  private comment = signal(" ");

  comments = toSignal(
    combineLatest([toObservable(this.postId), toObservable(this.reloadTrigger)]).pipe(
      filter(([postId]) => typeof postId === 'number'),
      switchMap(() => this.restApiService.listComments(String(this.postId()))),
    ),
    { initialValue: { comments: [] as any[] } },
  );

  deleteComment(commentId: number): void {
    this.restApiService.deleteComment(commentId).subscribe({
      next: () => this.reloadTrigger.update((n) => n + 1),
      error: (err) => console.error('No se pudo borrar', err),
    });
  }

  updateComment(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.comment.set(inputElement.value);
  }

  createComment() {
    this.restApiService.createComment(String(this.postId()), this.comment()).subscribe({
      next: () => {
        this.comment.set('');                      // 1. limpia el cuadro de texto
        this.reloadTrigger.update((n) => n + 1);    // 2. SUBE EL CONTADOR → la lista se recarga
      },
      error: (err) => console.error('No se pudo crear', err),
    });
  }
}
