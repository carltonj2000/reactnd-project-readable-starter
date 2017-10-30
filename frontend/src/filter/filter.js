import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activeFilter } from './filterActions';

export function Filter(props) {
  return <div>
    Select Sort By &rarr;
    (&nbsp;
    { props.filters && props.filters[0] &&
      props.filters.map((filter, index) =>
         <span key={index}>
           <button onClick={() => props.onClick(index)}>
             {filter.name}
             {filter.ascending ? <span>&uarr;</span> : <span>&darr;</span> }
           </button>&nbsp;
         </span>)}
    ).
    Presently Posts Sorted By&nbsp;
    {props.current.name.toUpperCase()}
    {props.current.ascending ? <span>&uarr;</span> : <span>&darr;</span> }.
  </div>
}

class  FilterComponent extends Component {
  render = () =>
    <Filter
      filters={this.props.filters}
      onClick={this.props.active}
      current={this.props.current}
    />
}

const mapStateToProps = value => ({
  filters: value.filterState.filters,
  current: value.filterState.filters[value.filterState.activeFilter]
});

const mapDispatchToProps = dispatch => {
  return {
    active: (index) => dispatch(activeFilter(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
