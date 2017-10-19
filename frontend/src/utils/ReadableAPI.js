const uuidv4 = require('uuid/v4');
const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3000';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = { 'Accept': 'application/json', 'Authorization': token };

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());

export const getPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers }).then(res => res.json());

export const postVote = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json())

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

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {method: 'DELETE', headers}).then(res => res.json())

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

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {method: 'DELETE', headers}).then(res => res.json())

export const commentVote = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json())

export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

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
