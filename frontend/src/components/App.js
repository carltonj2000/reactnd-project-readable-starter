import React, { Component } from 'react';
import CategoriesComponent from './CategoriesComponent';
import PostsComponent from './PostsComponent';
import PostDetailsComponent from './PostDetailsComponent';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <CategoriesComponent />
            <br />
            <PostsComponent />
          </div>
        )}/>
        <Route path="/post/:id" render={(props) => (
          <PostDetailsComponent id={props.match.params.id}/>
        )}/>
      </div>
    );
  }
}

export default App;
