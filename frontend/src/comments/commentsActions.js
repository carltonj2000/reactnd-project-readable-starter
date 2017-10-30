import {
  ADD_COMMENTS,
  REMOVE_COMMENT,
  VOTE4_COMMENT,
} from './commentsActionTypes';

export const addComments = comments => ({ type: ADD_COMMENTS, comments });
export const removeComment = id => ({ type: REMOVE_COMMENT, id });
export const vote4Comment = (id, modifier) => ({ type: VOTE4_COMMENT, id, modifier });
