import React from 'react';
import queryString from 'query-string';
import { sendCodeToBackend } from '../calls';
import { Redirect } from 'react-router';

class AuthHandler extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        sendCodeToBackend(params.code)
    }

    render() {
        return <Redirect to="/" />
    }
}

export default AuthHandler;