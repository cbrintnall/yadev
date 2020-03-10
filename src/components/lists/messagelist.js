import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as colors from '../../colors';
import { humanized_time_span } from '../../extra/humanized_time';
import { getTokenInfo } from '../../utils';
import { myMessage, otherMessage } from '../../colors';

export class MessageBox extends React.Component {
  constructor() {
    super();

    this.textRef = React.createRef();
  }

  onSubmit() {
    this.textRef.current && this.props.onSubmit &&
      this.props.onSubmit(this.textRef.current.value);

    this.textRef.current.value = "";
  }

  render() {
    return (
      <div
        style={{
          border: "3px solid black",
          borderRadius: "16px"
        }}
      >
        <InputGroup>
          <FormControl
            style={{ resize: "none", border: "0px", borderRadius: "16px" }}
            ref={this.textRef}
            as="textarea"
            onKeyPress={(e) => {
              // If shift or ctrl is held and enter is pressed, submit text
              if ((e.shiftKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                this.onSubmit();
              }
            }}
          />
          <InputGroup.Append>
            <Button
              style={{
                backgroundColor: colors.yaDevPurple,
                borderRadius: "14px"
              }}
              onClick={this.onSubmit.bind(this)}
            >
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    )
  }
}

class MessageTab extends React.Component {
  constructor() {
    super();

    this.isSender = this.isSender.bind(this);
  }

  isSender() {
    return getTokenInfo()._id === this.props.message.sender;
  }

  getColor() {
    return this.isSender() ? myMessage : otherMessage
  }

  render() {
    const style = {
      float: this.isSender(),
      textAlign: this.isSender() ? "left" : "right",
      color: "white",
      borderRadius: "5px",
      backgroundColor: this.getColor(),
      padding: ".5rem",
      margin: ".25rem .5rem .25rem .5rem",
      overflow: "auto",
      wordWrap: "normal",
      wordBreak: "break-word",
    }

    return (
      <Row className="d-flex justify-content-end">
        {this.isSender() && <Col></Col>}
        <Col>
          <div
            style={style}
          >
            {/* TODO: Support markdown in messages. */}
            {this.props.message.message}
            <br />
            <Badge style={{ margin: ".1rem .05rem .1rem .05rem" }}>
              { humanized_time_span(this.props.message.sentAt) }
            </Badge>
          </div>
        </Col>
        { !this.isSender() && <Col></Col> }
      </Row>
    )
  }
}

class MessageList extends React.Component {
  onMessageClick(msg) {
    this.props.selectedMessage && this.props.selectedMessage(msg);
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        {
          this.props.messages && this.props.messages.map((msg, i) => {
            return <MessageTab
              key={i}
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
