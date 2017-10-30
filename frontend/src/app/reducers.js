import { combineReducers } from 'redux';
import categoriesState from '../categories/categoriesReducer';
import commentsState from '../comments/commentsReducer';
import filterState from '../filter/filterReducer';
import postsState from '../posts/postsReducer';

export default combineReducers({
  categoriesState,
  commentsState,
  filterState,
  postsState,
})
