export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';
export const ADD_POSTS = 'ADD_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const ACTIVE_POST = 'ACTIVE_POST';
export const VOTE4_POST = 'VOTE4_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE4_COMMENT = 'VOTE4_COMMENT';
export const ACTIVE_FILTER = 'ACTIVE_FILTER';

export function addCategories(categories) {
  return { type: ADD_CATEGORIES, categories };
}

export function activeCategory(category) {
  return { type: ACTIVE_CATEGORY, category };
}

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
