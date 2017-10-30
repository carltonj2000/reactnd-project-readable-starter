import {
  ADD_CATEGORIES,
  ACTIVATE_CATEGORY,
} from './categoriesActionTypes';

const initialState = {
  categories: [],
  activeCategory: 'all',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {...state, categories: action.categories};
    case ACTIVATE_CATEGORY:
      return {...state, activeCategory: action.category};
    default: return state;
  }
}
