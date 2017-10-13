import React, { Component } from 'react';
import PostDetails from './PostDetails';
import Comments from './Comments';
import * as ReadableAPI from '../utils/ReadableAPI';
import {Link} from 'react-router-dom';

class PostsDetailsComponent extends Component {
  state = {
    post: null,
    comments: []
  }
  componentDidMount = () => {
    ReadableAPI.getPost(this.props.id)
      .then(data => this.setState(state => ({...state, post: data})))
      .catch(e => console.log(e));
    ReadableAPI.getPostComments(this.props.id)
      .then(data => this.setState(state => ({...state, comments: data})))
      .catch(e => console.log(e));
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

  render = () => <div>
    <Link to="/">Return to Post's Summary</Link>
    <PostDetails post={this.state.post} vote={this.postVote} />
    <Comments comments={this.state.comments} vote={this.commentVote} />
  </div>
}

export default PostsDetailsComponent;
