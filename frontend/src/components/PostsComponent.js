import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addPosts,
  removePost
} from '../actions';
import Posts from './Posts';

class PostsComponent extends Component {

  componentDidMount = () => {
    fetch('/posts', { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => {console.log(data);return this.props.add(data);})
      .catch(e => console.log(e));
  }

  render = () => <Posts posts={this.props.posts} />
}

const mapStateToProps = value => ({ posts: value.appState.posts });

const mapDispatchToProps = dispatch => {
  return {
    add: (posts) => dispatch(addPosts(posts)),
    remove: (id) => dispatch(removePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent);
