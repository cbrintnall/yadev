import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const userToken =() => {
    return Cookies.get('token');
}

export const loggedIn = () => {
    return !!userToken();
}

export const logout = () => {
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
  }).filter(item => !!item);
}