import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './filterActions';

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
      onClick={this.props.activeFilter}
      current={this.props.current}
    />
}

const mapStateToProps = ({filterState}) => ({
  ...filterState,
  current: filterState.filters[filterState.activeFilter]
});

export default connect(mapStateToProps, actions)(FilterComponent);
