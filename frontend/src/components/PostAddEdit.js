import React from 'react';
import { Input, Text, Label } from '../utils/Style';

function PostAddEdit(props) {
  return <div>
    <h1>
      { props.id === '0' ? <span>Add</span> : <span>Edit</span> } Post
    </h1>
    <form onSubmit={props.submit}>
        <Label htmlFor="title">Title:</Label>
          { props.id === '0' &&
            <Input id="title" type="text" name="title" />
          }
          { props.id !== '0' && props.post &&
            <Input id="title" type="text" name="title" defaultValue={`${props.post.title}`}/>
          }
        <br />
        <Label htmlFor="body">Body:</Label>
          { props.id === '0' &&
          <Text id="body" type="text" name="body"/>
          }
          { props.id !== '0' && props.post &&
          <Text id="body" type="text" name="body" defaultValue={`${props.post.body}`}/>
          }
        <br />
        { props.id === '0' && <div>
          <Label htmlFor="author">Author:</Label>
            <Input id="author" type="text" name="author" />
          <br />
          <Label htmlFor="category">Category:</Label>
            <select id="category">
              { props.categories.map((category, i) =>
                <option key={i} value={category}>{category}</option>)}
            </select>
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

export default PostAddEdit;
