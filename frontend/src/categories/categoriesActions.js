import {
  ADD_CATEGORIES,
  ACTIVE_CATEGORY,
} from './categoriesActionTypes';

export function addCategories(categories) {
  return { type: ADD_CATEGORIES, categories };
}

export function activeCategory(category) {
  return { type: ACTIVE_CATEGORY, category };
}
