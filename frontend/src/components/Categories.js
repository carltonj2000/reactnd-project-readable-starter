import React from 'react';

function Categories(props) {
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

export default Categories;
