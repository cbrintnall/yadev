import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import YouDevButton from '../buttons/YouDevButton';

const PageCounter = (props) => {
    const [current, setCurrent] = useState(1);

    const setCurrentWrapper = (next) => {
        if (next < 1) {
            setCurrent(1)
        } else {
            setCurrent(next)
            props.onChange && props.onChange(next)
        }
    }

    return (
        <div>
            <InputGroup>
                <YouDevButton
                    disabled={current < 2}
                    onClick={() => { setCurrentWrapper(current - 2) }}
                    style={{ borderRadius: "4px 0px 0px 4px", borderRight: "1px solid lightgray" }}
                >
                    ...
            </YouDevButton>
                {
                    current > 1 &&
                    <YouDevButton
                        onClick={() => { setCurrentWrapper(current - 1) }}
                        style={{ borderRadius: "0px", borderRight: "1px solid lightgray" }}
                    >
                        {current - 1}
                    </YouDevButton>
                }
                <YouDevButton
                    onClick={() => { setCurrentWrapper(current) }}
                    style={{ borderRadius: "0px", borderRight: "1px solid lightgray" }}
                >
                    {current}
                </YouDevButton>
                <YouDevButton
                    disabled={props.limit || false}
                    onClick={() => { setCurrentWrapper(current + 1) }}
                    style={{ borderRadius: "0px", borderRight: "1px solid lightgray" }}
                >
                    {current + 1}
                </YouDevButton>
                <YouDevButton
                    disabled={props.limit || false}
                    onClick={() => { setCurrentWrapper(current + 2) }}
                    style={{ borderRadius: "0px 4px 4px 0px" }}
                >
                    ...
            </YouDevButton>
            </InputGroup>
        </div>

    )
}

export default PageCounter;