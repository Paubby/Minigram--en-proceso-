import { Component, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Timestamp } from 'rxjs';

// type DataPost = {
//   id: number;
//   username: string;
//   caption: string;
//   image_filename: string;
//   created_at: Timestamp<string>;
// }

@Component({
  imports: [MatButtonModule,MatCardModule,MatIconModule],
  selector: 'app-post',
  styleUrl: './post.css',
  templateUrl: './post.html',
})
export class Post {

  post = input<any | undefined>();
}