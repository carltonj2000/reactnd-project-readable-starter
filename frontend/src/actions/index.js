export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function addCategories(categories) {
  return { type: ADD_CATEGORIES, categories: categories }
};

export function activeCategory(index) {
  return { type: ACTIVE_CATEGORY, index: index }
};

export function addPost(post) {
  return { type: ADD_POST, post: post }
};

export function removePost(id) {
  return { type: REMOVE_POST, id: id }
};

export function addComment(comment) {
  return { type: ADD_COMMENT, comment: comment }
};

export function removeComment(id) {
  return { type: REMOVE_COMMENT, id: id }
};
