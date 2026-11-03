import { Component, inject } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { Post } from '../../components/post/post';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [Post],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  private readonly api: RestApiService = inject(RestApiService)
  posts = toSignal(this.api.listPosts())
}
