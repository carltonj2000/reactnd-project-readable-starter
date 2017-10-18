import React, { Component } from 'react';
import CommentAddEdit from './CommentAddEdit';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { addCategories } from '../actions';

class CommentAddEditComponent extends Component {
  state = {
    errors: [],
    posted: false
  }

  componentDidMount = () => {
    if (this.props.categories.length === 0) {
      ReadableAPI.getCategories().then(data => this.props.add(data));
    }
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
    const author = e.target.author.value;
    if (!author) {
      errors = true;
      this.setState(state =>
        ({...state, errors: state.errors.concat("author is empty")}));
    }
    const option = e.target.category;
    const category = option.options[option.selectedIndex].value;
    if (category === 'none') {
      errors = true;
      this.setState(state =>
        ({...state, errors: state.errors.concat("category should not be none")}));
    }
    if (!errors) {
      console.log('no errors');
      ReadableAPI.addPost({title, body, author, category}).then(() => {
        this.setState(state => ({...state, posted: true}));
        return false;
      });
    }
  }

  render = () => <div>
    { !this.state.posted &&
      <CommentAddEdit
        submit={this.submit}
        errors={this.state.errors}
        categories={['none', ...this.props.categories]}
      />
    }
    { this.state.posted &&
      <Redirect to="/" />
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(CommentAddEditComponent);
