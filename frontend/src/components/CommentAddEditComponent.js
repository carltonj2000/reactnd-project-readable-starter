import React, { Component } from 'react';
import CommentAddEdit from './CommentAddEdit';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Redirect } from 'react-router';

class CommentAddEditComponent extends Component {
  state = {
    errors: [],
    commented: false,
    activeComment: null
  }

  componentDidMount = () => {
    if (this.props.id !== '0') { // add if 0 else edit
      ReadableAPI.getComment(this.props.id).then(comment =>
        this.setState(state => ({...state, activeComment: comment})));
    }
  }

  componentWillUnmount = () => this.setState(state => ({...state, commented: false}));

  submit = (e) => {
    e.preventDefault();
    let errors = false;
    this.setState(state => ({...state, errors: []}));
    const body = e.target.body.value;
    if (!body) {
      errors = true;
      this.setState(state =>
        ({...state, errors: state.errors.concat("body is empty")}));
    }
    let author = '';
    if (this.props.id === '0') {
      author = e.target.author.value;
      if (!author) {
        errors = true;
        this.setState(state =>
          ({...state, errors: state.errors.concat("author is empty")}));
      }
    }
    if (!errors) {
      if (this.props.id === '0') {
        ReadableAPI.addComment({body, author, parentId: this.props.parentId})
          .then(() => {
            this.setState(state => ({...state, commented: true}));
            return false;
          });
      } else {
        ReadableAPI.editComment(this.props.id, {body})
          .then(() => {
            this.setState(state => ({...state, commented: true}));
            return false;
          });
      }
    }
  }

  render = () => <div>
    { !this.state.commented &&
      <CommentAddEdit
        submit={this.submit}
        errors={this.state.errors}
        id={this.props.id}
        comment={this.state.activeComment}
      />
    }
    { this.state.commented &&
      <Redirect to={`/post/${this.props.parentId}`} />
    }
  </div>
}

export default CommentAddEditComponent;
