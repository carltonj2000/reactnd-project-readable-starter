import React from 'react';
import { Input, Text, Label } from '../utils/Style';

function CommentAddEdit(props) {
  return <div>
    <h1>
      { props.id === '0' ? <span>Add</span> : <span>Edit</span> } Comment
    </h1>
    <form onSubmit={props.submit}>
        <Label htmlFor="body">Body:</Label>
        { props.id === '0' &&
        <Text id="body" type="text" name="body"/>
        }
        { props.id !== '0' && props.comment && 
        <Text id="body" type="text" name="body" defaultValue={`${props.comment.body}`}/>
        }
        <br />
        { props.id === '0' && <div>
          <Label htmlFor="author">Author:</Label>
          <Input id="author" type="text" name="author" />
          <br />
        </div>}
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
