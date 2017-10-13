import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const LinkAdd = styled(Link)`background: #ff3311;`;
const LinkEdit = styled(Link)`background: #00ffff;`;

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
