import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import * as settings from './settings';

export const userToken = () => {
  const cookie = Cookies.get('token');
  return cookie;
}

export const loggedIn = () => {
  return !!userToken();
}

export const logout = () => {
  localStorage.removeItem('authToken');
  Cookies.remove('token');
}

export const getTokenInfo = () => {
  const val = userToken();

  if (val) {
    return jwtDecode(val);
  } else {
    return undefined;
  }
};

export const messageToConversation = (msgs) => {
  const conversations = {};

  return msgs.map(msg => {
    if (!(msg.receiver in conversations)) {
      conversations[msg.receiver] = [];
    }

    if (!!conversations[msg.receiver].indexOf(msg.sender)) {
      conversations[msg.receiver].push(msg.sender);
      return msg;
    }

    return undefined;
  }).filter(item => !!item);
}

export const loginGithub = () => {
  window.location = `https://github.com/login/oauth/authorize?client_id=${settings.default.githubAccountId}&redirect_uri=${settings.default.backendUrl}/auth/github?next=${settings.default.hostBase}/`
}

export const loginGoogle = () => {
  window.location = `${settings.default.backendUrl}/auth/google?next=${settings.default.hostBase}`;
}