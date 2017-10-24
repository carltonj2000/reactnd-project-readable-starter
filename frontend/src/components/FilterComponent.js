import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activeFilter } from '../actions';
import Filter from './Filter';

class  FilterComponent extends Component {
  render = () =>
    <Filter
      filters={this.props.filters}
      onClick={this.props.active}
      current={this.props.current}
    />
}

const mapStateToProps = value => ({
  filters: value.appState.filters,
  current: value.appState.filters[value.appState.activeFilter]
});

const mapDispatchToProps = dispatch => {
  return {
    active: (index) => dispatch(activeFilter(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
