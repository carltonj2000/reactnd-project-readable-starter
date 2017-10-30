import {
  ADD_CATEGORIES,
  ACTIVE_CATEGORY,
} from './categoriesActionTypes';

export const addCategories = categories => ({ type: ADD_CATEGORIES, categories });
export const activeCategory = category => ({ type: ACTIVE_CATEGORY, category });
