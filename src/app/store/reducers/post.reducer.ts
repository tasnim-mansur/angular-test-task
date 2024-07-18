import { createReducer, on } from '@ngrx/store';
import { loadPostsSuccess, loadPostsFailure, createPostSuccess, updatePostSuccess, deletePostSuccess } from '../actions/post.actions';
import { Post } from '../../models/post.model';

// Define the PostState interface
export interface PostState {
  posts: Post[];
  error: string | null;
}

// Initial state
export const initialState: PostState = {
  posts: [],
  error: null
};

// Create the reducer
export const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(loadPostsFailure, (state, { error }) => ({ ...state, error })),
  on(createPostSuccess, (state, { post }) => ({ ...state, posts: [...state.posts, post] })),
  on(updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map(p => p.id === post.id ? post : p)
  })),
  on(deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== id)
  }))
);
