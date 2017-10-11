import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addPosts,
  removePost
} from '../actions';
import Posts from './Posts';

class PostsComponent extends Component {

  postDisplayed = () => this.props.activeCategory === 'none'
    ? this.props.posts
    : this.props.posts.filter(post => post.category === this.props.activeCategory)

  componentDidMount = () => {
    fetch('/posts', { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => this.props.add(data))
      .catch(e => console.log(e));
  }

  render = () => <Posts posts={this.postDisplayed()} />
}

const mapStateToProps = value => ({
  posts: value.appState.posts,
  activeCategory: value.appState.activeCategory
});

const mapDispatchToProps = dispatch => {
  return {
    add: (posts) => dispatch(addPosts(posts)),
    remove: (id) => dispatch(removePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent);
