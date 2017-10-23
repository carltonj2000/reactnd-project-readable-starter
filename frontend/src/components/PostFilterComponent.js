import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCategories,
  activeCategory
} from '../actions';
import Categories from './Categories';
import * as ReadableAPI from '../utils/ReadableAPI';

class  PostFilterComponent extends Component {

  componentDidMount = () => {
    if (this.props.categories.length === 0)
      ReadableAPI.getCategories().then(data => this.props.add(data));
  }

  onClick = (category) => this.props.active(category);

  render = () =>
    <PostFilter
      categories={this.props.categories}
      onClick={this.onClick}
    />
}

const mapStateToProps = value => ({ categories: value.appState.categories });

const mapDispatchToProps = dispatch => {
  return {
    add: (categories) => dispatch(addCategories(categories)),
    active: (category) => dispatch(activeCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFilterComponent);
