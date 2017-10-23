import React, { Component } from 'react';
import PostAddEdit from './PostAddEdit';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { addCategories } from '../actions';

class PostAddEditComponent extends Component {
  state = {
    errors: [],
    posted: false,
    activePost: null
  }

  componentDidMount = () => {
    if (this.props.categories.length === 0) {
      ReadableAPI.getCategories().then(data => this.props.add(data));
    }
    if (this.props.id !== '0') { // add if 0 else edit
      ReadableAPI.getPost(this.props.id).then(post =>
        this.setState(state => ({...state, activePost: post})));
    }
    console.log(this.props);
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
        post={this.state.activePost}
      />
    }
    { this.state.posted && <Redirect to="/" /> }
  </div>
}

//const mapStateToProps = value => ({ categories: value.appState.categories });
const mapStateToProps = value => {
  const categories = value.appState.categories.map(cat => cat.name);
  return { categories };
}

const mapDispatchToProps = dispatch => ({
    add: (categories) => dispatch(addCategories(categories))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostAddEditComponent);
