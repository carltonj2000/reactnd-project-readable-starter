import React, { Component } from 'react';
import CategoriesComponent from './CategoriesComponent';
import FilterComponent from './FilterComponent';
import PostsComponent from './PostsComponent';
import PostDetailsComponent from './PostDetailsComponent';
import PostAddEditComponent from './PostAddEditComponent';
import CommentAddEditComponent from './CommentAddEditComponent';
import {Route, Switch} from 'react-router-dom';
import { Title } from '../utils/Style';

class App extends Component {
  render() {
    return (
      <div>
        <Title>Udacity React Readble Project</Title>
        <Switch>
          <Route exact path="/" render={() => (
            <div>
              <CategoriesComponent />
              <br />
              <FilterComponent />
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
          <Route path="/comment/addEdit/:parentId/:id" render={(props) => (
            <CommentAddEditComponent
              id={props.match.params.id}
              parentId={props.match.params.parentId}
            />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
