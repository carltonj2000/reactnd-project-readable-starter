import React, { Component } from 'react';
import Categories from './Categories';
import Posts from './Posts';
import Comments from './Comments';

class App extends Component {
  render() {
    return (
      <div>
        <Categories />
        <br />
        <Posts />
      </div>
    );
  }
}

export default App;
