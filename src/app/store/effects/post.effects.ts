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
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostEffects {
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
      mergeMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map(createdPost => createPostSuccess({ post: createdPost })),
          catchError(error => of(createPostFailure({ error })))
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      mergeMap(({ id, post }) =>
        this.postService.updatePost(id, post).pipe(
          map(updatedPost => updatePostSuccess({ post: updatedPost })),
          catchError(error => of(updatePostFailure({ error })))
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      mergeMap(({ id }) =>
        this.postService.deletePost(id).pipe(
          map(() => deletePostSuccess({ id })),
          catchError(error => of(deletePostFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private postService: PostService) {}
}
