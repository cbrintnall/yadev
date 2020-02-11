import './css/mainnav.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import YouDevButton from './buttons/YouDevButton';
import LoginModal from './modals/LoginModal';
import PostModal from './modals/PostModal';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GlobalNotificationManager from '../gnm';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';
import { logout, userToken, getTokenInfo } from '../utils';
import { getMessages, getSentMessages } from '../calls';
import * as colors from '../colors';

const MAX_MESSAGE_PREVIEW_LENGTH = 45;

const MessageTab = (props) => {
  const msg = props.message.message.length > MAX_MESSAGE_PREVIEW_LENGTH ?
    props.message.message.substring(0, MAX_MESSAGE_PREVIEW_LENGTH - 3) + "..." :
    props.message.message

  return (
    <Row style={{ margin: "6px 0px 6px 0px", borderRadius: "6px", zIndex: "-1" }} className="d-flex align-items-center">
      <p style={{ margin: "0px" }}> {msg} </p>
    </Row>
  )
}

class MessageButton extends React.Component {
  constructor() {
    super();

    this.getMessagesPerUser = this.getMessagesPerUser.bind(this);
  }

  getTitle() {
    return (
      <span
      >
        Messages
        <Badge
          variant={this.props.messages && this.props.messages.length > 0 ? "danger" : "primary"}
          style={{ marginLeft: ".3rem", marginRight: ".1rem" }}
        >
          {this.getMessagesPerUser() && this.getMessagesPerUser().length}
        </Badge>
      </span>
    )
  }

  getMessagesPerUser() {
    const { _id } = getTokenInfo();
    const encountered = [];

    const messages = this.props.messages && [
      ...new Set(
        this.props.messages
          .filter(item => item.sender !== _id)
      )
    ];

    return messages
      .filter(item => {
        if (encountered.indexOf(item.sender)) {
          encountered.push(item.sender);
          return true;
        }
      })
  }

  render() {
    return (
      <DropdownButton
        disabled={this.getMessagesPerUser() && this.getMessagesPerUser().length === 0}
        id="msgInner"
        title={this.getTitle()}
        style={{ padding: "0px" }}
      >
        <div
          style={{
            border: "3px solid black",
            borderRadius: "6px"
          }}
        >
          {
            this.getMessagesPerUser() && this.getMessagesPerUser().map((msg, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  eventKey={msg}
                  onClick={() => { this.props.onMessageClick && this.props.onMessageClick(msg) }}
                >
                  <MessageTab
                    message={msg}
                  />
                </Dropdown.Item>
              )
            })
          }
        </div>
      </DropdownButton>
    )
  }
}

class MainNav extends React.Component {
  constructor() {
    super();

    this.state = {
      showLoginModal: false,
      showPostModal: false,
      alerts: [],
      messages: []
    }

    GlobalNotificationManager.subscribe('alert', this.onAlertNotification.bind(this));
  }

  onAlertNotification(msg) {
    if (typeof msg === "string") {
      this.addAlert(msg, false);
    }

    if (typeof msg === "object") {
      this.addAlert(msg.msg, msg.ok);
    }
  }

  componentDidMount() {
    this.setState({
      loggedIn: !!this.props.loggedIn,
      alerts: this.props.alerts ? this.props.alerts : []
    })

    this.getMessages()
  }

  logout() {
    const { history } = this.props;

    logout();

    this.setState({
      loggedIn: false
    })

    history.push('/')
  }

  getMessages() {
    // don't attempt to grab messages if the user isn't even logged in
    if (!getTokenInfo()) return;

    const userId = getTokenInfo()._id
    const token = userToken()

    getSentMessages()
      .then(res => {
        const messages = this.state.messages || [];

        this.setState({
          messages: [...messages, ...res.data.results]
        })
      })
      .catch(err => {
        console.log(err)
      })

    getMessages(userId, token)
      .then(res => {
        const messages = this.state.messages || [];

        this.setState({
          messages: [...messages, ...res.data.results]
        })
      })
      .catch(err => {
        GlobalNotificationManager.push('alert', { msg: "Failed to retrieve messages!", ok: false });
      })
  }

  getAccountButton() {
    if (this.state.loggedIn) {
      return (
        <YouDevButton
          style={{ marginLeft: "1rem" }}
          onClick={() => this.logout()}
          text="Logout"
        />
      )
    } else {
      return (
        <YouDevButton
          style={{ marginLeft: "1rem" }}
          onClick={() => this.setState({ showLoginModal: !this.state.showLoginModal })}
          text="Login"
        />
      )
    }
  }

  addAlert(text, success = true) {
    let alerts = this.state.alerts;
    alerts.push(
      <Alert
        key={text}
        onClick={this.onAlertClick.bind(this)}
        style={{ width: "100%", margin: "0px", textAlign: "center" }}
        variant={success ? "success" : "danger"}
      >
        {text} <strong> ( Click to remove ) </strong>
      </Alert>
    )

    this.setState({ alerts })
  }

  onPostSuccess(payload) {
    this.addAlert("Successfully added post!");
    this.setState({ showPostModal: false });
  }

  onPostError(payload) {
    this.addAlert("Failed to post!", false);
    this.setState({ showPostModal: false });
  }

  onAlertClick(e) {
    if (e.target.classList.contains('alert')) {
      e.target.remove();
    }
  }

  onMessageClick(msg) {
    this.props.history.push(`/messages/${msg.receiver}/${msg.sender}`);
  }

  render() {
    return (
      <Col>
        <Row>
          {this.state.alerts}
        </Row>
        <Row>
          <Navbar
            style={{
              zIndex: "500",
              backgroundImage: `linear-gradient(${colors.yaDevBlue}, ${colors.yaDevPurple})`,
              borderBottom: "3px solid black",
              width: "100%",
              padding: "20px",
            }}
          >
            <LoginModal
              show={this.state.showLoginModal}
              onHide={() => this.setState({ showLoginModal: false })}
            />
            <PostModal
              show={this.state.showPostModal}
              onHide={() => this.setState({ showPostModal: false })}
              onPost={this.onPostSuccess.bind(this)}
              onPostError={this.onPostError.bind(this)}
            />
            <Row
              className="align-items-center"
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "2rem"
              }}
            >
              <Navbar.Brand
                href="#"
                onClick={() => this.props.history.push('/')}
                style={{
                  margin: "0px 12px 0px 12px",
                  borderRight: "2px solid black",
                  paddingRight: "12px"
                }}
              >
                <h2>
                  YaDev
              </h2>
              </Navbar.Brand>
              {
                this.state.loggedIn &&
                <MessageButton
                  style={{ marginLeft: "1rem", height: "100%" }}
                  messages={this.state.messages}
                  onMessageClick={this.onMessageClick.bind(this)}
                />
              }
              {
                this.state.loggedIn &&
                <YouDevButton
                  style={{ marginLeft: "1rem" }}
                  text="Make Post"
                  onClick={() => this.setState({ showPostModal: true })}
                />
              }
              <YouDevButton
                style={{ marginLeft: "1rem" }}
                text="Home"
                onClick={() => this.props.history.push('/')}
              />
              {
                userToken() &&
                <YouDevButton
                  style={{ marginLeft: "1rem" }}
                  text="Profile"
                  onClick={() => this.props.history.push('/profile/me')}
                />
              }
              {this.getAccountButton()}
            </Row>
          </Navbar>
        </Row>
      </Col>
    )
  }
}

export default withRouter(MainNav);
