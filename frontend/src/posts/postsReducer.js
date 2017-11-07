import {
  ADD_POSTS,
  REMOVE_POST,
  ACTIVE_POST,
  VOTE4_POST,
  COMMENTS_ON_POST,
} from './postsActionTypes';

const initialState = {
  posts: [],
  post: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case COMMENTS_ON_POST:
      return {...state, posts: state.posts.map(post => post.id !== action.id
        ? post : {...post, comments: action.count}),
      post: active};
    default: return state;
  }
}
