import axios from 'axios';
import Settings from './settings';

const instance = axios.create({
    baseURL: Settings.backendUrl
})

export const sendPost = (post) => {
  return instance.post('/post', post);
};

export const getUser = (username) => {
  return instance.get(`/user/${username}`);
}

export const getPosts = (page) => {
  return instance.get(`/post/${page}`);
}
