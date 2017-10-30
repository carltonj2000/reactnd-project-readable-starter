import {
  ADD_CATEGORIES,
  ACTIVATE_CATEGORY,
} from './categoriesActionTypes';

export const addCategories = categories => ({ type: ADD_CATEGORIES, categories });
export const activateCategory = category => ({ type: ACTIVATE_CATEGORY, category });
