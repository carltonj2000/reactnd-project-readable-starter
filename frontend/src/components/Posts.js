import React from 'react';
import { LinkAdd, LinkEdit } from '../utils/Style';

function Posts(props) {
  return <div>
    Posts<br />
    <LinkAdd to='/post/addEdit/0'>Add new post</LinkAdd>
    { props.posts && props.posts[0] &&
      props.posts.map((post, index) =>
         <div key={index}>
           <LinkEdit to={`/post/addEdit/${post.id}`}>Edit</LinkEdit>&nbsp;
           <a href={"post/" + post.id}>{post.title}</a>,
           Category:{post.category}
         </div>
      )
    }
  </div>
}

export default Posts;
