import Cookies from 'js-cookie';

export const userToken =() => {
    return Cookies.get('token');
}

export const loggedIn = () => {
    return !!userToken();
}

export const logout = () => {
    Cookies.remove('token');
}