import {
  ADD_COMMENTS,
  REMOVE_COMMENT,
  VOTE4_COMMENT,
} from './commentsActionTypes';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
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
