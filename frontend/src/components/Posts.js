import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addPosts,
  removePost
} from '../actions';


class Posts extends Component {

  componentDidMount = () => {
    fetch('/posts', { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => {console.log(data);return this.props.add(data);})
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        Posts
        { this.props.posts && this.props.posts[0] &&
          this.props.posts.map((post, index) =>
             <div key={index}>
               <a href="{post.id}">{post.title}</a>, 
               Category:{post.category}
             </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = value => ({ posts: value.appState.posts });

const mapDispatchToProps = dispatch => {
  return {
    add: (posts) => dispatch(addPosts(posts)),
    remove: (id) => dispatch(removePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
