import React from 'react';
import { LinkAdd } from '../utils/Style';

function Posts(props) {
  return <div>
    <h2>
      Posts&nbsp;
      <LinkAdd to='/post/addEdit/0'>Add new post</LinkAdd>
  </h2>
    { props.posts && props.posts[0] &&
      props.posts.map((post, index) =>
         <div key={index}>
           <a href={"/post/" + post.id}>{post.title}</a>,
           Vote: {post.voteScore}&nbsp;
           <button onClick={() => props.vote(post.id, 'upVote')}>+</button>
           <button onClick={() => props.vote(post.id, 'downVote')}>-</button>,
         Category:{post.category},&nbsp;
       </div>
      )
    }
  </div>
}

export default Posts;
