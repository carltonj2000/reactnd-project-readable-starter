import React, { Component } from 'react';
import PostDetails from './PostDetails';
import Comments from './Comments';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Link, Redirect } from 'react-router-dom';

class PostsDetailsComponent extends Component {
  state = {
    post: null,
    comments: [],
    deleted: false
  }
  componentDidMount = () => {
    ReadableAPI.getPost(this.props.id)
      .then(data => this.setState(state => ({...state, post: data})))
      .catch(e => console.log(e));
    ReadableAPI.getPostComments(this.props.id)
      .then(data => this.setState(state => ({...state, comments: data})))
      .catch(e => console.log(e));
  }

  componentWillUnmount = () => {
    this.setState(state => ({...state, deleted: false}));
  }
  postVote = (id, upDown) =>
    ReadableAPI.postVote(id, upDown)
      .then(result => this.setState(state => ({...state, post: result})))
      .catch(e => console.log(e));

  commentVote = (id, upDown) =>
    ReadableAPI.commentVote(id, upDown)
      .then(result => {
          let index = 0;
          for(let i=0; result.id !== this.state.comments[i].id; i++) index++;
          return this.setState(state => ({...state,
            comments: [...state.comments.slice(0,index),
              result, ...state.comments.slice(index+1)]}))
        })
      .catch(e => console.log(e));
  deletePost = (id) =>
    ReadableAPI.deletePost(id)
      .then(() => {
        this.setState(state => ({...state, deleted: true}));
        return false;
      });

  render = () => <div>
    { !this.state.deleted && <div>
        <Link to="/">Return to Post's Summary</Link>
        <PostDetails
          post={this.state.post}
          vote={this.postVote}
          delete={this.deletePost}
        />
        <Comments comments={this.state.comments} vote={this.commentVote} />
      </div>
    }
    { this.state.deleted &&
      <Redirect to="/" />
    }
  </div>
}

export default PostsDetailsComponent;
