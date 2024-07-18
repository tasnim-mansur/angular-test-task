import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { AppState } from '../../store/reducers'; // Ensure the correct path
import { loadPosts, deletePost } from '../../store/actions/post.actions';
import { selectPosts } from '../../store/selectors/post.selectors';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private store: Store<AppState>) { // Type the store with AppState
    this.posts$ = this.store.pipe(select(selectPosts));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

  deletePost(id: number): void {
    this.store.dispatch(deletePost({ id }));
  }
}
