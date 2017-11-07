import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkAdd, LinkDelete, LinkEdit } from '../utils/Style';

import * as postsActions from './postsActions';
import * as commentsActions from '../comments/commentsActions';
import * as ReadableAPI from '../utils/ReadableAPI';

const CommentCount = ({post}) => {
if(post.comments || post.comments === 0) { return (<span>{post.comments}</span>); }
  else { return (<span>Loading</span>); }
}

export function Posts(props) {
  return (<div>
    <h2>
      Posts&nbsp;
      <LinkAdd to='/post/addEdit/0' returnurl='/'>Add new post</LinkAdd>
    </h2>
    { props.posts && props.posts[0] &&
      props.posts.map((post, index) =>
         <div key={index}>
           <a href={"/post/" + post.id}>{post.title}</a>,
           Vote: {post.voteScore}&nbsp;
           <button onClick={() => props.vote(post.id, 'upVote')}>+</button>
           <button onClick={() => props.vote(post.id, 'downVote')}>-</button>,
           Post&nbsp;
           <LinkEdit to={`/post/addEdit/${post.id}`} >Edit</LinkEdit>/
           <LinkDelete href="/" onClick={() => props.delete(post.id)}>Delete</LinkDelete>,&nbsp;
           Category: {post.category},&nbsp;
           Comments: <CommentCount post={post} />
       </div>
      )
    }
  </div>);
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

  componentDidMount = () => {
    ReadableAPI.getPosts(this.props.addPosts)
      .then(() => this.props.posts.map(post => {
        return ReadableAPI.getPostComments(post.id, this.props.addComments)
          .then(() => this.props.commentsOnPost(post.id,  this.props.comments.length));
      }));
}
  vote = (id, upDown) => ReadableAPI.vote4Post(id, upDown, this.props.vote4Post);
  delete = (id) => ReadableAPI.deletePost(id, this.props.removePost);

  render = () => <div>
    <Posts
      posts={this.postDisplayed()}
      vote={this.vote}
      delete={this.delete}
      returnurl={this.props.match.url}
    />
  </div>
}

const mapStateToProps = ({postsState, categoriesState, filterState, commentsState}) =>
  ({ ...postsState, ...categoriesState, ...filterState, ...commentsState });

export default connect(mapStateToProps, {...postsActions, ...commentsActions})(PostsComponent);
