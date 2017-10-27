import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addPosts,
  removePost,
  vote4Post,
} from '../actions';
import Posts from './Posts';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostsComponent extends Component {

  postDisplayed = () => {
    let posts = this.props.posts;
    if (this.props.activeCategory !== 'all')
      posts = this.props.posts.filter(post => post.category === this.props.activeCategory)

    let filtered = null;
    let index = this.props.activeFilter;
    let filter = this.props.filters[index];
    switch(index) {
      case 0: filtered = filter.ascending
        ? posts.sort((l,r) => l.voteScore < r.voteScore)
        : posts.sort((l,r) => l.voteScore > r.voteScore)
        break;
      case 1: filtered = filter.ascending
        ? posts.sort((l,r) => l.timestamp < r.timestamp)
      : posts.sort((l,r) => l.timestamp > r.timestamp)
        break;
      default: filtered = posts; break;
    }
    return filtered;
  }

  componentDidMount = () => ReadableAPI.getPosts(this.props.add);
  vote = (id, upDown) => ReadableAPI.vote4Post(id, upDown, this.props.vote);
  delete = (id) => ReadableAPI.deletePost(id, this.props.remove);

  render = () => <Posts
    posts={this.postDisplayed()}
    vote={this.vote}
    delete={this.delete}
  />
}

const mapStateToProps = value => ({
  posts: value.appState.posts,
  activeCategory: value.appState.activeCategory,
  filters: value.appState.filters,
  activeFilter: value.appState.activeFilter,
});

const mapDispatchToProps = dispatch => {
  return {
    add: (posts) => dispatch(addPosts(posts)),
    remove: (id) => dispatch(removePost(id)),
    vote: (id, modifier) => dispatch(vote4Post(id, modifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent);
