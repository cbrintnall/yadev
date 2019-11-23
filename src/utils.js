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
