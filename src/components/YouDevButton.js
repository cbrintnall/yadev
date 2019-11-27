import React from 'react';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default class YouDevButton extends React.Component {
    constructor() {
        super()
    }
    
    render() {
        const type = this.props.subtype || "default";
        const ButtonType = type === "default" ? Button : DropdownButton

        return (
            <ButtonType
                {...this.props}
                style={{
                    backgroundColor: "#A492E8",
                    color: "white",
                    ...this.props.style}}
            >
                {this.props.text}
                {this.props.children}
            </ButtonType>
        )
    }
}
