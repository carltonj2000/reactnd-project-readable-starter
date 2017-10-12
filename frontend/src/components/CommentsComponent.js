import React, { Component } from 'react';
import Comments from './Comments';

class CommentsComponent extends Component {

  componentDidMount = () => {
    console.log('comments loaded');
    console.log(this.props);
  }

  render() {
    return (
        <Comments />
    );
  }
}

export default CommentsComponent;
