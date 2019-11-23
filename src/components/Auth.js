import React from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router';

class AuthHandler extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
    }

    render() {
        return <Redirect to="/" />
    }
}

export default AuthHandler;
