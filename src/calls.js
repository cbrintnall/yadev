import axios from 'axios';
import Settings from './settings';

const instance = axios.create({
    baseURL: Settings.backendUrl
})

export const removePost = (postId, userToken) => {
  return instance.delete(`/post/${postId}`, { headers: { token: userToken }});
};

export const sendPost = (post) => {
  return instance.post('/post', post);
};

export const getUser = (username) => {
  return instance.get(`/user/${username}`);
}

export const getPosts = (page) => {
  return instance.get(`/post/${page}`);
}

export const getPost = (_id) => {
  return instance.post(`/post/${_id}`);
}

export const sendMessage = (from, to, message, relatedPost, token) => {
  return instance.post(`/message/${to}/${from}`, { message, relatedPost }, { headers: { token: token }});
}

export const getMessages = (to, token) => {
  return instance.get(`/message/${to}`, { headers: { token: token }});
}

export const getConversation = (to, from, token) => {
  return instance.get(`/message/${to}/${from}`, { headers: { token: token }})
}
