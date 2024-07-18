import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/index'; // Adjust path if necessary
import { PostState } from '../reducers/post.reducer';

// Selector to get the PostState from the AppState
export const selectPostState = (state: AppState) => state.posts;

// Selector to get posts from PostState
export const selectPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

// Selector to get error from PostState
export const selectPostError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);
