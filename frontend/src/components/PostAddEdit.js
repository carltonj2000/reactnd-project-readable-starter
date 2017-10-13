import React from 'react';

function Posts(props) {
  return <div>
    Posts<br />
    <button>Add new post</button>
    { props.posts && props.posts[0] &&
      props.posts.map((post, index) =>
         <div key={index}>
           <a href={"post/" + post.id}>{post.title}</a>,
           Category:{post.category}
         </div>
      )
    }
  </div>
}

export default Posts;
