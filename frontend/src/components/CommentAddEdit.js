import React from 'react';

function Comments(props) {
  return <div>
    <h2>Comments</h2>
    <button>Add New Comment</button>
    { props && props.comments && props.comments[0] &&
      props.comments.map((comment, index) =>
        <div key={index}>
          <h3>Comment Details &nbsp; <button>Edit Comment Details</button></h3>
          Body: {comment.body}<br/>
          Votes: {comment.voteScore} &nbsp; <button>+</button> <button>-</button><br/>
          Author: {comment.author}<br/>
          Date: {comment.timestamp}<br/>
        </div>
    )}
  </div>
}

export default Comments;
