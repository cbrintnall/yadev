import React from 'react';
import Form from 'react-bootstrap/Form';

class TagInput extends React.Component {
    constructor() {
        super();
    }

    handleKeyPress(e) {
        if (e.key === ",") {
            
        }
    }

    render() {
        return (
            <Form.Control
                {...this.props}
                onKeyPress={this.handleKeyPress}
            />
        )
    }
}

export default TagInput;