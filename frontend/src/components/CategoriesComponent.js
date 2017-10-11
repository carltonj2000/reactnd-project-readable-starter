import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCategories,
  activeCategory
} from '../actions';
import Categories from './Categories';

class CategoriesComponent extends Component {

  componentDidMount = () => {
    fetch('/categories', { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => this.props.add(data.categories))
      .catch(e => console.log(e));
  }

  onClick = (category) => this.props.active(category);

  render = () =>
    <Categories
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesComponent);