import {
  ADD_POSTS,
  REMOVE_POST,
  ACTIVE_POST,
  VOTE4_POST,
} from './postsActionTypes';

export const addPosts = posts => ({ type: ADD_POSTS, posts });
export const removePost = id => ({ type: REMOVE_POST, id });
export const activePost = post => ({ type: ACTIVE_POST, post });
export const vote4Post = (id, modifier) => ({ type: VOTE4_POST, id, modifier });
