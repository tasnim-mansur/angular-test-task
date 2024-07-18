import { ActionReducerMap } from '@ngrx/store';
import { postReducer, PostState } from './post.reducer';

// Define the AppState interface to represent the root state
export interface AppState {
  posts: PostState;
}

// Combine reducers into an ActionReducerMap
export const reducers: ActionReducerMap<AppState> = {
  posts: postReducer
};
