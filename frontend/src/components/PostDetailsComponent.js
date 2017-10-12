import React, { Component } from 'react';
import PostDetails from './PostDetails';
import Comments from './Comments';

class PostsDetailsComponent extends Component {

  state = {
    post: null,
    comments: []
  }
  componentDidMount = () => {
    fetch(`/posts/${this.props.id}`, { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => this.setState(state => ({...state, post: data})))
      .catch(e => console.log(e));
    fetch(`/posts/${this.props.id}/comments`, { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => this.setState(state => ({...state, comments: data})))
      .catch(e => console.log(e));
  }

  render = () => <div>
    <PostDetails post={this.state.post} />
    <Comments comments={this.state.comments}/>
  </div>
}

export default PostsDetailsComponent;
