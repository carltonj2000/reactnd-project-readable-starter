import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { LinkAdd, LinkEdit, LinkDelete } from '../utils/Style';

function Comments(props) {
  return <div>
    <h2>Comments ({props.comments.length})</h2>

    <LinkAdd to={`/comment/addEdit/${props.parent}/0`}>Add New Comment</LinkAdd>
    { props && props.comments && props.comments[0] &&
      props.comments.map((comment, index) =>
        <div key={index}>
          <h3>Comment &nbsp;
            <LinkEdit to={`/comment/addEdit/${props.parent}/${comment.id}`}>Edit</LinkEdit>
            &nbsp;
            <LinkDelete href="#" onClick={() => props.delete(comment.id)}>Delete</LinkDelete>
          </h3>
          Body: {comment.body}<br/>
          Votes: {comment.voteScore} &nbsp;
                  <button onClick={() => props.vote(comment.id, 'upVote')}>+</button>
                  <button onClick={() => props.vote(comment.id, 'downVote')}>-</button><br/>
          Author: {comment.author}<br/>
          Date: {ReadableAPI.formatDate(comment.timestamp)}<br/>
        </div>
    )}
  </div>
}

export default Comments;
