import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../models/post.model';
import { AppState } from '../../store/reducers';
import { loadPosts, deletePost } from '../../store/actions/post.actions';
import { selectPosts } from '../../store/selectors/post.selectors';
import {PostCreateComponent} from "../post-create/post-create.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.posts$ = this.store.pipe(select(selectPosts));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

  editPost(post: Post): void {
    this.openModal(post);
  }

  createNewPost(): void {
    this.openModal(null);
  }

  deletePost(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deletePost({ id }));
      }
    });
  }

  private openModal(post: Post | null): void {
    this.dialog.open(PostCreateComponent, {
      width: '800px',
      height: '375px',
      data: { post }
    });
  }
}
