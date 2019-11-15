import React from 'react';

export default class ContactPage extends React.Component {
    constructor() {
        super()

        this.state = {
            user: ""
        }
    }

    componentDidMount() {
        const { match: { params: { user } } } = this.props

        this.setState({
            user: user
        })
    }

    render() {
        return (
            <div>
                SUP: {this.state.user}
            </div>
        )
    }
}