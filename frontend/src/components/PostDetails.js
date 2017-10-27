import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { LinkDelete, LinkEdit } from '../utils/Style';

function PostDetails(props) {
  return <div>
    { props && props.post &&
      <div>
        <h2>Post&nbsp;
          <LinkEdit to={`/post/addEdit/${props.post.id}`}>Edit</LinkEdit>&nbsp;
          <LinkDelete href="#" onClick={() => props.delete(props.post.id)}>Delete</LinkDelete>
        </h2>
        Title: {props.post.title}<br/>
        Body: {props.post.body}<br/>
        Votes: {props.post.voteScore} &nbsp;
                <button onClick={() => props.vote(props.post.id, 'upVote')}>+</button>
                <button onClick={() => props.vote(props.post.id, 'downVote')}>-</button><br/>
        Author: {props.post.author}<br/>
        Category: {props.post.category}<br/>
        Date: {ReadableAPI.formatDate(props.post.timestamp)}
      </div>
    }
  </div>
}

export default PostDetails;
