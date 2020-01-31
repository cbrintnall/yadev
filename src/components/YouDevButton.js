import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as color from '../colors';

const YouDevButton = (props) => {
    const [hover, setHover] = useState(false);
    const shadowLength = props.shadowlength || 5

    return (
        <div style={{paddingBottom: hover ? "0px" : `${shadowLength}px`}}>
            <Button
                {...props}
                style={{
                    ...props.style,
                    display: "inline-block",
                    backgroundColor: color.yaDevPurple,
                    color: "white",
                    borderBottom: hover ? `${shadowLength}px solid ${color.yaDevGrey}` : "",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {props.text}
                {props.children}
            </Button>
        </div>
    )
}

export default YouDevButton;
