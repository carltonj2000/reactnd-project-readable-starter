import React from 'react';

function Categories(props) {
  return <div>
    Select Post Filter Catagory -> (
    { props.categories && props.categories[0] &&
      props.categories.map((category, index) =>
         <span key={index}>
           <button onClick={() => props.onClick(category.name)}>
             {category.name}
           </button>&nbsp;
         </span>)}
      <button onClick={() => props.onClick('none')}>none</button>
    ).
  </div>
}

export default Categories;
