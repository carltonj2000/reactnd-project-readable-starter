import React from 'react';

function PostDetails(props) {
  return <div>
    { props && props.post &&
      <div>
        <h1>Post Details &nbsp; <button>Edit Post Details</button></h1>
        Title: {props.post.title}<br/>
        Body: {props.post.body}<br/>
        Votes: {props.post.voteScore}<br/>
        Author: {props.post.author}<br/>
        Category: {props.post.category}<br/>
        Date: {props.post.timestamp}
      </div>
    }
  </div>
}

export default PostDetails;
