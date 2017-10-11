import React, { Component } from 'react';
import CategoriesComponent from './CategoriesComponent';
import PostsComponent from './PostsComponent';

class App extends Component {
  render() {
    return (
      <div>
        <CategoriesComponent />
        <br />
        <PostsComponent />
      </div>
    );
  }
}

export default App;
