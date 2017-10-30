import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkAdd } from '../utils/Style';

import * as actions from './postsActions';
import * as ReadableAPI from '../utils/ReadableAPI';

export function Posts(props) {
  return <div>
    <h2>
      Posts&nbsp;
      <LinkAdd to='/post/addEdit/0'>Add new post</LinkAdd>
  </h2>
    { props.posts && props.posts[0] &&
      props.posts.map((post, index) =>
         <div key={index}>
           <a href={"/post/" + post.id}>{post.title}</a>,
           Vote: {post.voteScore}&nbsp;
           <button onClick={() => props.vote(post.id, 'upVote')}>+</button>
           <button onClick={() => props.vote(post.id, 'downVote')}>-</button>,
         Category:{post.category},&nbsp;
       </div>
      )
    }
  </div>
}

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

  componentDidMount = () => ReadableAPI.getPosts(this.props.addPosts);
  vote = (id, upDown) => ReadableAPI.vote4Post(id, upDown, this.props.vote4Post);
  delete = (id) => ReadableAPI.deletePost(id, this.props.removePost);

  render = () => <Posts
    posts={this.postDisplayed()}
    vote={this.vote}
    delete={this.delete}
  />
}

const mapStateToProps = value => ({
  posts: value.postsState.posts,
  activeCategory: value.categoriesState.activeCategory,
  filters: value.filterState.filters,
  activeFilter: value.filterState.activeFilter,
});

export default connect(mapStateToProps, actions)(PostsComponent);
