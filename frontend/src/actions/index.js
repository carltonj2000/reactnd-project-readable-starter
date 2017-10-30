import {
  ADD_POSTS,
  REMOVE_POST,
  ACTIVE_POST,
  VOTE4_POST,
  ADD_COMMENTS,
  REMOVE_COMMENT,
  VOTE4_COMMENT,
  ACTIVE_FILTER,
} from './types';

export function addPosts(posts) {
  return { type: ADD_POSTS, posts };
}

export function removePost(id) {
  return { type: REMOVE_POST, id };
}

export function activePost(post) {
  return { type: ACTIVE_POST, post };
}

export function vote4Post(id, modifier) {
  return { type: VOTE4_POST, id, modifier };
}

export function addComments(comments) {
  return { type: ADD_COMMENTS, comments };
}

export function removeComment(id) {
  return { type: REMOVE_COMMENT, id };
}

export function activeFilter(filter) {
  return { type: ACTIVE_FILTER, filter };
}

export function vote4Comment(id, modifier) {
  return { type: VOTE4_COMMENT, id, modifier };
}
