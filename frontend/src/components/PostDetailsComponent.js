import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  removePost,
  activePost,
  vote4Post,
  addComments,
  removeComment,
  vote4Comment,
} from '../actions';
import { Link, Redirect } from 'react-router-dom';

import PostDetails from './PostDetails';
import Comments from './Comments';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostsDetailsComponent extends Component {
  state = {
    deleted: false
  }

  componentDidMount = () => {
    ReadableAPI.getPost(this.props.id, this.props.activePost);
    ReadableAPI.getPostComments(this.props.id, this.props.addComments);
  }

  componentWillUnmount = () => this.setState(state => ({...state, deleted: false}));
  postVote = (id, upDown) => ReadableAPI.vote4Post(id, upDown, this.props.vote4Post);
  commentVote = (id, upDown) => ReadableAPI.vote4Comment(id, upDown, this.props.vote4Comment);

  deletePost = (id) => ReadableAPI.deletePost(id, this.props.removePost)
    .then(() => {
      this.setState(state => ({...state, deleted: true}));
      return false;
    });

  deleteComment = (id) => ReadableAPI.deleteComment(id, this.props.removeComment)
    .then(() => true);

  render = () => <div>
    { !this.state.deleted && <div>
        <Link to="/">Return to Post's Summary</Link>
        <PostDetails
          post={this.props.post}
          vote={this.postVote}
          delete={this.deletePost}
        />
        <Comments
          comments={this.props.comments &&
            this.props.comments.sort((l,r) => l.voteScore < r.voteScore)}
          vote={this.commentVote}
          parent={this.props.id}
          delete={this.deleteComment}
        />
      </div>
  }
    { this.state.deleted &&
      <Redirect to="/" />
    }
  </div>
}

const mapStateToProps = value => ({
  post: value.appState.post,
  comments: value.appState.comments,
});

const mapDispatchToProps = dispatch => {
  return {
    removePost: (id) => dispatch(removePost(id)),
    activePost: (post) => dispatch(activePost(post)),
    vote4Post: (id, modifier) => dispatch(vote4Post(id,modifier)),
    addComments: (comments) => dispatch(addComments(comments)),
    removeComment: (comment) => dispatch(removeComment(comment)),
    vote4Comment: (id, modifier) => dispatch(vote4Comment(id,modifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsDetailsComponent);
