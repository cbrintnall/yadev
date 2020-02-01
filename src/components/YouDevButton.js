import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import * as color from '../colors';

const YouDevButton = (props) => {
    const [hover, setHover] = useState(false);
    const shadowLength = props.shadowlength || 3

    const showEffects = hover && !props.disabled

    return (
        <div style={{paddingBottom: showEffects ? "0px" : `${shadowLength}px`}}>
            <Button
                {...props}
                style={{
                    height: "100%",
                    display: "inline-block",
                    backgroundColor: color.yaDevPurple,
                    color: "white",
                    borderBottom: showEffects ? `${shadowLength}px solid ${color.yaDevGrey}` : "",
                    ...props.style,
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
