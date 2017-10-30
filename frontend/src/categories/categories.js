import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as categoriesActions from './categoriesActions';
import * as ReadableAPI from '../utils/ReadableAPI';

export function Categories(props) {
  return <div>
    Select View By Catagory &rarr; (&nbsp;
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

  componentDidMount = () => ReadableAPI.getCategories(this.props.addCategories);
  onClick = (category) => this.props.activateCategory(category);

  render = () =>
    <Categories
      categories={this.props.categories}
      onClick={this.onClick}
      category={this.props.activeCategory}
    />
}

const mapStateToProps = ({ categoriesState }) => ({ ...categoriesState });
export default connect(mapStateToProps, categoriesActions)(CategoriesComponent);
