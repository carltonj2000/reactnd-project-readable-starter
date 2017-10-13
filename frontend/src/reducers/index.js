import { combineReducers } from 'redux';
import {
  ADD_CATEGORIES,
  ACTIVE_CATEGORY,
  ADD_POSTS,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions';

const initialState = {
  categories: [],
  activeCategory: 'all',
  posts: [],
  comments: []
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {...state, categories: action.categories};
    case ACTIVE_CATEGORY:
      return {...state, activeCategory: action.category};
    case ADD_POSTS:
      return {...state, posts: [...action.posts]};
    case REMOVE_POST:
      return {...state,
        posts: state.posts.filter(post => post.id !== action.post.id)
      };
    case ADD_COMMENT:
      return {...state,
        posts: [
           ...state.comments,
           action.comments
         ]
      };
    case REMOVE_COMMENT:
      return {...state,
        posts: state.comments.filter(comments => comments.id !== action.comments.id)
      };
    default: return state;
  }
}


export default combineReducers({
  appState
})
