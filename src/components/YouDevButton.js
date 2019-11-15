import React from 'react';
import Button from 'react-bootstrap/Button';

export default class YouDevButton extends React.Component {
    constructor() {
        super()
    }
    
    render() {
        return (
            <Button 
                {...this.props}
                style={{backgroundColor: "#A492E8"}}
            >
                {this.props.text}
            </Button>
        )
    }
}
