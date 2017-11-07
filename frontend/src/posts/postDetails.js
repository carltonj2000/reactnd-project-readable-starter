import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as postsActions from './postsActions';
import * as commentsActions from '../comments/commentsActions';
import Comments from '../comments/comments';
import * as ReadableAPI from '../utils/ReadableAPI';
import { LinkDelete, LinkEdit } from '../utils/Style';

export function PostDetails(props) {
  return <div>
    { props && props.post &&
      <div>
        <h2>Post&nbsp;
          <LinkEdit
            to={`/post/addEdit/${props.post.id}`}
            returnurl={`/post/${props.post.id}`}
            >
            Edit
          </LinkEdit>&nbsp;
          <LinkDelete href="#" onClick={() => props.delete(props.post.id)}>Delete</LinkDelete>
        </h2>
        Title: {props.post.title}<br/>
        Body: {props.post.body}<br/>
        Votes: {props.post.voteScore} &nbsp;
                <button onClick={() => props.vote(props.post.id, 'upVote')}>+</button>
                <button onClick={() => props.vote(props.post.id, 'downVote')}>-</button><br/>
        Author: {props.post.author}<br/>
        Category: {props.post.category}<br/>
        Date: {ReadableAPI.formatDate(props.post.timestamp)}
      </div>
    }
  </div>
}

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
    { this.state.deleted && <Redirect to="/" /> }
    { !this.state.deleted && this.props.post &&
      Object.keys(this.props.post).length === 0 &&
      this.props.post.constructor === Object &&
      <Redirect to="/pageNotFound" />
    }
  </div>
}

const mapStateToProps = ({postsState, commentsState}) => ({...postsState, ...commentsState});

export default connect(mapStateToProps, {...postsActions, ...commentsActions})(PostsDetailsComponent);
