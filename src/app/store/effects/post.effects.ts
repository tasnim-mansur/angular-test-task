import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/post.service';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  createPost,
  createPostSuccess,
  createPostFailure,
  updatePost,
  updatePostSuccess,
  updatePostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure
} from '../actions/post.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService, private snackBar: MatSnackBar) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map(posts => loadPostsSuccess({ posts })),
          catchError(error => of(loadPostsFailure({ error })))
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      switchMap(action =>
        this.postService.createPost(action.post).pipe(
          map(post => {
            this.snackBar.open('Post created successfully!', 'Close', { duration: 3000 });
            return createPostSuccess({ post });
          }),
          catchError(error => {
            this.snackBar.open('Failed to create post.', 'Close', { duration: 3000 });
            return of(createPostFailure({ error }));
          })
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      switchMap(action =>
        this.postService.updatePost(action.id, action.post).pipe(
          map(post => {
            this.snackBar.open('Post updated successfully!', 'Close', { duration: 3000 });
            return updatePostSuccess({ post });
          }),
          catchError(error => {
            this.snackBar.open('Failed to update post.', 'Close', { duration: 3000 });
            return of(updatePostFailure({ error }));
          })
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap(action =>
        this.postService.deletePost(action.id).pipe(
          map(() => {
            this.snackBar.open('Post deleted successfully!', 'Close', { duration: 3000 });
            return deletePostSuccess({ id: action.id });
          }),
          catchError(error => {
            this.snackBar.open('Failed to delete post.', 'Close', { duration: 3000 });
            return of(deletePostFailure({ error }));
          })
        )
      )
    )
  );
}
