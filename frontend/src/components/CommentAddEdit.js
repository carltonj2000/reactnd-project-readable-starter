import React from 'react';

function CommentAddEdit(props) {
  return <div>
    <h1>Add/Edit Comment</h1>
    <form onSubmit={props.submit}>
        <label htmlFor="body">Body:
          <textarea id="body" type="text" name="body" />
        </label><br />
        <label htmlFor="author">Author:
          <input id="author" type="text" name="author" />
        </label><br />
        <input type="submit" value="Submit" />
    </form>
    { props && props.errors &&  props.errors[0] &&
      <div>
        <h2>Fix The Form Errors Noted Below</h2>
        <ul>
          {props.errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
      </div>
    }
  </div>
}

export default CommentAddEdit;
