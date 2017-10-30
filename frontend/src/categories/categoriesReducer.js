import {
  ADD_CATEGORIES,
  ACTIVE_CATEGORY,
} from './categoriesActionTypes';

const initialState = {
  categories: [],
  activeCategory: 'all',
};

export default function categoriesState (state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {...state, categories: action.categories};
    case ACTIVE_CATEGORY:
      return {...state, activeCategory: action.category};
    default: return state;
  }
}
