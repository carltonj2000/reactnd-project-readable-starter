import { combineReducers } from 'redux';
import {
  ADD_CATEGORIES,
  ACTIVE_CATEGORY,
  ADD_POSTS,
  REMOVE_POST,
  ACTIVE_POST,
  VOTE4_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  VOTE4_COMMENT,
  ACTIVE_FILTER,
} from '../actions';

const initialState = {
  categories: [],
  activeCategory: 'all',
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
    case ADD_CATEGORIES:
      return {...state, categories: action.categories};
    case ACTIVE_CATEGORY:
      return {...state, activeCategory: action.category};
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
      return {...state, posts: state.posts.map(post => post.id !== action.id
        ? post : {...post, voteScore: post.voteScore + action.modifier}),
      post: {...state.post, voteScore: state.post.voteScore + action.modifier}};
    case ADD_COMMENT:
      return {...state,
        comments: [
           ...state.comments,
           action.comment
         ]
      };
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
  appState
})
