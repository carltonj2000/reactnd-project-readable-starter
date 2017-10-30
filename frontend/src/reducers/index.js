import { combineReducers } from 'redux';
import categoriesState from '../categories/categoriesReducer';

import {
  ADD_POSTS,
  REMOVE_POST,
  ACTIVE_POST,
  VOTE4_POST,
  ADD_COMMENTS,
  REMOVE_COMMENT,
  VOTE4_COMMENT,
  ACTIVE_FILTER,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  comments: [],
  filters: [
    {name: 'votes', ascending: true},
    {name: 'date', ascending: false}
  ],
  activeFilter: 0,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_FILTER:
      let index = action.filter;
      let filter = state.filters.slice(index,index + 1)[0];
      let filters = [
        ...state.filters.slice(0, index),
        {...filter, ascending: !filter.ascending},
        ...state.filters.slice(index + 1),
      ];
      return {...state, activeFilter: index, filters: filters};
    case ADD_POSTS:
      return {...state, posts: [...action.posts]};
    case REMOVE_POST:
      return {...state,
        posts: state.posts.filter(post => post.id !== action.id)
      };
    case ACTIVE_POST:
      return {...state, post: action.post};
    case VOTE4_POST:
      let active = state.post // setup up active post if none active
        ? state.post
        : state.posts.filter(post => post.id === action.id)[0];
      active.voteScore = active.voteScore + action.modifier;
      return {...state, posts: state.posts.map(post => post.id !== action.id
        ? post : {...post, voteScore: post.voteScore + action.modifier}),
      post: active};
    case ADD_COMMENTS:
      return {...state, comments: action.comments };
    case REMOVE_COMMENT:
      return {...state,
        comments: state.comments.filter(comment => comment.id !== action.id)
      };
    case VOTE4_COMMENT:
      return {...state, comments: state.comments.map(comment => comment.id !== action.id
        ? comment : {...comment, voteScore: comment.voteScore + action.modifier})};
    default: return state;
  }
}


export default combineReducers({
  appState,
  categoriesState
})
