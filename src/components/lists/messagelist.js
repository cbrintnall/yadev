import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { humanized_time_span } from '../../extra/humanized_time';
import { getTokenInfo } from '../../utils';

class MessageBox extends React.Component {
    constructor() {
        super();

        this.textRef = React.createRef();
    }

    onSubmit() {
        this.textRef.current && this.props.onSubmit &&
            this.props.onSubmit(this.textRef.current.value);
    }

    render() {
        const style = {
            resize: "none",
            margin: ".15rem 0rem .15rem .3rem"
        }

        return (
            <InputGroup>
                <FormControl
                    ref={this.textRef}
                    as="textarea" 
                    style={style}
                    onKeyPress={(e) => {
                        // If shift or ctrl is held and enter is pressed, submit text
                        if ((e.shiftKey || e.ctrlKey) && e.keyCode === 0) {
                            e.preventDefault();
                            this.onSubmit();
                        }
                    }}
                />
                <InputGroup.Append>
                    <Button
                        style={{margin: ".15rem .3rem .15rem 0rem"}}
                        onClick={this.onSubmit.bind(this)}
                    >Send</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

class MessageTab extends React.Component {
    constructor() {
        super();
    }

    getColor() {
        return this.props.isOwner && this.props.isOwner ? "lightgray" : "red"
    }

    render() {
        const style = {
            borderRadius: "5px",
            backgroundColor: this.getColor(),
            padding: ".5rem",
            margin: ".25rem .5rem .25rem .5rem",
            overflow: "auto",
            wordWrap: "normal",
            wordBreak: "break-all"
        }

        return (
            <Row>
                <div
                    style={style}
                    onClick={() => {
                        this.props.onClick && this.props.onClick(this.props.message)
                    }}
                >
                    {this.props.message.message}
                    <br/>
                    <Badge style={{margin: ".1rem .05rem .1rem .05rem"}}>
                        {humanized_time_span(this.props.message.sentAt)}
                    </Badge>
                </div>
            </Row>
        )
    }
}

class MessageList extends React.Component {
    constructor() {
        super();
    }

    onMessageClick(msg) {
        this.props.selectedMessage && this.props.selectedMessage(msg);
    }

    render() {
        return (
            <div>
                {
                    this.props.messages && this.props.messages.map((msg, i) => {
                        const isOwner = getTokenInfo()._id === msg.sender

                        return <MessageTab
                            key={i}
                            isOwner={isOwner}
                            onClick={this.onMessageClick.bind(this)}
                            message={msg}
                        />
                    })
                }
            </div>
        )
    }
}

export default MessageList;