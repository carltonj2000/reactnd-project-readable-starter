const uuidv4 = require('uuid/v4');
const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3000';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = { 'Accept': 'application/json', 'Authorization': token };

export const getCategories = (stateUpdate) =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => stateUpdate(data.categories))
    .catch(e => {console.log(e); alert('Failure to access server'); });

export const getPosts = (stateUpdate) =>
  fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  .then(res => stateUpdate(res))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const getPost = (id, stateUpdate) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(res => stateUpdate(res))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const getPostComments = (id, stateUpdate) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .then(res => stateUpdate(res))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
  .then(res => res.json());

const voteModifier = (vote) => vote === 'upVote' ? 1 : -1;
export const vote4Post = (id, vote, stateUpdate) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})})
  .then(res => res.json())
  .then(() => stateUpdate(id, voteModifier(vote)))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const addPost = (data) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      id: uuidv4(),
      timestamp: Date.now()
    })
  }).then(res => res.json())

export const editPost = (id, data) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => console.log(res) /*;res.json() */ )

export const deletePost = (id, stateUpdate) =>
  fetch(`${api}/posts/${id}`, {method: 'DELETE', headers})
  .then(res => res.json())
  .then(() => stateUpdate(id))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const addComment = (data) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      id: uuidv4(),
      timestamp: Date.now()
    })
  }).then(res => res.json())

export const editComment = (id, data) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())

export const deleteComment = (id, stateUpdate) =>
  fetch(`${api}/comments/${id}`, {method: 'DELETE', headers})
  .then(res => res.json())
  .then(() => stateUpdate(id))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const vote4Comment = (id, vote, stateUpdate) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})})
  .then(res => res.json())
  .then(() => stateUpdate(id, voteModifier(vote)))
  .catch(e => {console.log(e); alert('Failure to access server'); });

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const day = "0" + date.getDate();
  const month = "0" + date.getMonth();
  const year = date.getFullYear();
  return  month.substr(-2) + "/" + day.substr(-2) + "/" + year + " - " +
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
