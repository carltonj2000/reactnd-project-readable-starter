import React from 'react';
function Filter(props) {
  return <div>
    Post Sorted By&nbsp;
    {props.current.name.toUpperCase()}
    {props.current.ascending ? <span>&uarr;</span> : <span>&darr;</span> }.
    Select Sort &rarr;
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
  </div>
}

export default Filter;
