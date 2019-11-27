import "./BadgeButton.css";
import React from 'react';
import Badge from 'react-bootstrap/Badge';

class BadgeButton extends React.Component {
    constructor() {
        super();
    }
    render() {
        const baseStyle = {
            margin: ".3rem",
            boxShadow: "4px -4px lightgray"
        }

        return (
            <Badge
                className="badgeBtn"
                {...this.props}
                style={baseStyle}
            >
                {this.props.children}
            </Badge>
        )
    }
}

export default BadgeButton