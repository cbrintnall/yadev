import axios from 'axios';

import * as utils from './utils';
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

export const getPosts = (page) => {
  return instance.get(`/post/${page}`);
}

export const getPost = (_id) => {
  return instance.post(`/post/${_id}`);
}

export const sendMessage = (to, message, token = utils.userToken()) => {
  return instance.post(`/message/${to}`, { message }, { headers: { token: token }});
}

export const getMessages = (token = utils.userToken()) => {
  return instance.get(`/user/messages`, { headers: { token }});
}

export const getConversation = (to, from, token) => {
  return instance.get(`/message/${to}/${from}`, { headers: { token: token }})
}

export const getUserProfileInfo = (token = utils.userToken()) => {
  const id = String(utils.getTokenInfo()._id)
  return instance.get(`/user/${id}`, { headers: { token }})
}

export const getUser = (userId, token="") => {
  return instance.get(`/user/${userId}`, { headers: { token: token }})
}

export const getUsersRatings = (ids) => {
  return instance.get(`/ratings`, { params: { ids } });
}

export const createNewRating = (to, contract, amount, token = utils.userToken()) => {
  return instance.post('/ratings', { user: to, relatedContract: contract, value: amount }, { headers: { token }});
}

export const getUsersPosts = (id, page = 1) => {
  return instance.get(`/user/${id}/posts/${page}`);
}

export const getSentMessages = (token = utils.userToken()) => {
  return instance.get('/user/messages/sent', { headers: { token }});
}

export const submitOffer = (offer, token = utils.userToken()) => {
  return instance.post('/offer', { ...offer }, { headers: { token }});
}

// u2 should be the other user
export const getLatestOffer = (u2, u1 = utils.getTokenInfo()._id, token = utils.userToken()) => {
  return instance.get(`/offer/latest/${u1}/${u2}`, { headers: { token }});
}

export const counterOffer = (offer_id, counter, token = utils.userToken()) => {
  return instance.put(`/offer/${offer_id}/counter`, { counter }, { headers: { token }})
}

export const getMainLatestOffers = (token = utils.userToken()) => {
  return instance.get(`/offer/main/latest`, { headers: { token }})
}

export const rejectOffer = (offer_id, token = utils.userToken()) => {
  return instance.put(`/offer/${offer_id}/reject`, {}, { headers: { token }})
}

export const acceptOffer = (offer_id, token = utils.userToken()) => {
  return instance.put(`/offer/${offer_id}/accept`, {}, { headers: { token }})
}

export const getAcceptedContractsWithNoEstimate = (token = utils.userToken()) => {
  return instance.get(`/contract/estimates`, { headers: { token }})
}

export const getRejectedOffers = (token = utils.userToken()) => {
  return instance.get(`/offer/rejected`, { headers: { token }})
}

export const updateContract = (payload, token = utils.userToken()) => {
  return instance.put('/contract', payload, { headers: { token }})
}

export const createNewContract = (payload, token = utils.userToken()) => {
  return instance.post('/contract', payload, { headers: { token }})
}

export const getLatestContracts = (token = utils.userToken()) => {
  return instance.get('/contract/latest', { headers: { token }})
}

export const notifyCompletion = (contract, token = utils.userToken()) => {
  return instance.put('/contract/notify', { contract }, { headers: { token }})
}

export const getMissingRatings = (token = utils.userToken()) => {
  return instance.get('/ratings/missing', { headers: { token }})
}
