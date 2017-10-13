import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as ReadableAPI from '../utils/ReadableAPI';

const LinkEdit = styled(Link)`background: #00ffff; font-size: 16px;`;

function PostDetails(props) {
  return <div>
    { props && props.post &&
      <div>
        <h1>Post Details &nbsp;
          <LinkEdit to={`/post/addEdit/${props.post.id}`}>Edit Post Details</LinkEdit></h1>
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
