import React, { Component } from 'react';
import { Input, Text, Label } from '../utils/Style';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as postsActions from './postsActions';
import * as categoriesActions from '../categories/categoriesActions';

export function PostAddEdit(props) {
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

class PostAddEditComponent extends Component {
  state = {
    errors: [],
    posted: false,
}

  componentDidMount = () => {
    if (this.props.id === '0') { // add post if 0 else edit
      if (this.props.categories.length === 0)
        ReadableAPI.getCategories(this.props.addCategories);
    } else
      ReadableAPI.getPost(this.props.id, this.props.activePost);
  }

  componentWillUnmount = () => {
    this.setState(state => ({...state, posted: false}));
  }

  submit = (e) => {
    e.preventDefault();
    let errors = false;
    this.setState(state => ({...state, errors: []}));
    const title = e.target.title.value;
    if (!title) {
      errors = true;
      this.setState(state =>
        ({...state, errors: state.errors.concat("title is empty")}));
    }
    const body = e.target.body.value;
    if (!body) {
      errors = true;
      this.setState(state =>
        ({...state, errors: state.errors.concat("body is empty")}));
    }

  let author = '';
  let option = '';
  let category = '';
  if (this.props.id === '0') {
      author = e.target.author.value;
      if (!author) {
        errors = true;
        this.setState(state =>
          ({...state, errors: state.errors.concat("author is empty")}));
      }
      option = e.target.category;
      category = option.options[option.selectedIndex].value;
      if (category === 'none') {
        errors = true;
        this.setState(state =>
          ({...state, errors: state.errors.concat("category should not be none")}));
      }
    }
    if (!errors) {
      if (this.props.id === '0') {
        ReadableAPI.addPost({title, body, author, category}).then(() => {
          this.setState(state => ({...state, posted: true}));
          return false;
        });
      } else {
        ReadableAPI.editPost(this.props.id, {title, body}).then(() => {
          this.setState(state => ({...state, posted: true}));
          return false;
        });
      }
    }
  }

  render = () => <div>
    { !this.state.posted &&
      <PostAddEdit
        submit={this.submit}
        errors={this.state.errors}
        categories={['none', ...this.props.categories]}
        id={this.props.id}
        post={this.props.post}
      />
    }
    { /* different return page for add and edit */ }
    { this.state.posted && (this.props.id === '0') &&
      <Redirect to={`/`} /> }
    { this.state.posted && (this.props.id !== '0') &&
      <Redirect to={`/post/${this.props.id}`} /> }
  </div>
}

const mapStateToProps = value => ({
  categories : value.categoriesState.categories.map(cat => cat.name),
  post: value.postsState.post,
});

export default connect(mapStateToProps, {...postsActions, ...categoriesActions})(PostAddEditComponent);
