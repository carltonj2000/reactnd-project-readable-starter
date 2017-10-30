import React, { Component } from 'react';
import PostAddEdit from './PostAddEdit';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  activePost,
} from '../actions';

import {
  addCategories,
} from '../categories/categoriesActions';

class PostAddEditComponent extends Component {
  state = {
    errors: [],
    posted: false,
}

  componentDidMount = () => {
    if (this.props.id === '0') { // add post if 0 else edit
      if (this.props.categories.length === 0)
        ReadableAPI.getCategories(this.props.add);
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

//const mapStateToProps = value => ({ categories: value.appState.categories });
const mapStateToProps = value => {
  return {
    categories : value.appState.categories.map(cat => cat.name),
    post: value.appState.post,
  }
}

const mapDispatchToProps = dispatch => ({
    add: (categories) => dispatch(addCategories(categories)),
    activePost: (post) => dispatch(activePost(post)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PostAddEditComponent);
