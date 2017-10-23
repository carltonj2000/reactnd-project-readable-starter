import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { LinkDelete } from '../utils/Style';

function PostDetails(props) {
  return <div>
    { props && props.post &&
      <div>
        <h1>Post&nbsp;
          <LinkDelete href="#" onClick={() => props.delete(props.post.id)}>Delete</LinkDelete>
        </h1>
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
