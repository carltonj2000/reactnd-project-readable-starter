import React, { Component } from 'react';
import CategoriesComponent from './CategoriesComponent';
import PostsComponent from './PostsComponent';
import PostDetailsComponent from './PostDetailsComponent';
import PostAddEditComponent from './PostAddEditComponent';
import CommentAddEditComponent from './CommentAddEditComponent';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <div>
              <CategoriesComponent />
              <br />
              <PostsComponent />
            </div>
          )}/>
          <Route path="/post/addEdit/:id" render={(props) => (
             <PostAddEditComponent id={props.match.params.id}/>
          )}/>
          <Route path="/post/:id" render={(props) => (
            <PostDetailsComponent id={props.match.params.id}/>
          )}/>
          <Route path="/comment/addEdit/:id" render={(props) => (
            <CommentAddEditComponent id={props.match.params.id}/>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
