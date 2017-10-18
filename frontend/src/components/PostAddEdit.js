import React from 'react';

function PostAddEdit(props) {
  return <div>
    <h1>Add/Edit Post</h1>
    <form onSubmit={props.submit}>
        <label htmlFor="title">Title:
          <input id="title" type="text" name="title" />
        </label><br />
        <label htmlFor="body">Body:
          <textarea id="body" type="text" name="body" />
        </label><br />
        <label htmlFor="author">Author:
          <input id="author" type="text" name="author" />
        </label><br />
        <label htmlFor="category">Category:
          <select id="category">
            { props.categories.map((category, i) =>
              <option key={i} value={category}>{category}</option>)}
          </select>
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

export default PostAddEdit;
