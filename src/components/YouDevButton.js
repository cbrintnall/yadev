import React from 'react';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as color from '../colors';

export default class YouDevButton extends React.Component {
    constructor() {
        super()
    }
    
    render() {
        return (
            <Button
                {...this.props}
                style={{
                    display: "inline-block",
                    backgroundColor: color.yaDevPurple,
                    color: "white",
                    ...this.props.style
                }}
            >
                {this.props.text}
                {this.props.children}
            </Button>
        )
    }
}
