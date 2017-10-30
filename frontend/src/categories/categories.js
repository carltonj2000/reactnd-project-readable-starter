import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addCategories,
  activeCategory
} from './categoriesActions';
import * as ReadableAPI from '../utils/ReadableAPI';

export function Categories(props) {
  return <div>
    Select View Catagory &rarr; (&nbsp;
    { props.categories && props.categories[0] &&
      props.categories.map((category, index) =>
        <span key={index}>
          <button onClick={() => props.onClick(category.name)}>
            {category.name}
          </button>&nbsp;
        </span>)}
      <button onClick={() => props.onClick('all')}>all</button>&nbsp;).
    Presently Viewing {props.category.toUpperCase()} Posts.
  </div>
}

class CategoriesComponent extends Component {

  componentDidMount = () => ReadableAPI.getCategories(this.props.add);
  onClick = (category) => this.props.active(category);

  render = () =>
    <Categories
      categories={this.props.categories}
      onClick={this.onClick}
      category={this.props.category}
    />
}

const mapStateToProps = value => ({
  categories: value.categoriesState.categories,
  category: value.categoriesState.activeCategory
});

const mapDispatchToProps = dispatch => {
  return {
    add: (categories) => dispatch(addCategories(categories)),
    active: (category) => dispatch(activeCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesComponent);
