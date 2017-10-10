import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCategories,
  activeCategory
} from '../actions';

class Categories extends Component {

  componentDidMount = () => {
    fetch('/categories', { headers: { 'Authorization': 'whatever-you-want' }})
      .then(resp => resp.json())
      .then(data => this.props.add(data.categories))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        Categories
        { console.log(this.props.categories)}
        { this.props.categories && this.props.categories[0] &&
          this.props.categories.map((category, index) =>
             <div key={index}>{category.name}</div>
          )
        }
      </div>
    );
  }
}
const mapStateToProps = (value) => {
  return { categories: value.appState.categories };
}

const mapDispatchToProps = dispatch => {
  return {
    add: (categories) => dispatch(addCategories(categories)),
    active: (index) => dispatch(activeCategory(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
