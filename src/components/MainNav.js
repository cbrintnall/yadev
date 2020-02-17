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
import { FaGamepad } from 'react-icons/fa';

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
      messages: []
    }
  }

  componentDidMount() {
    this.setState({
      loggedIn: !!this.props.loggedIn
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

  onPostSuccess(payload) {
    GlobalNotificationManager.sendAlert("Successfully added post!", true)
    this.setState({ showPostModal: false });
  }

  onPostError(payload) {
    GlobalNotificationManager.sendAlert("Failed to post!", false)
    this.setState({ showPostModal: false });
  }

  onMessageClick(msg) {
    this.props.history.push(`/messages/${msg.receiver}/${msg.sender}`);
  }

  render() {
    return (
      <div>
        <LoginModal
          show={this.state.showLoginModal}
          onHide={() => this.setState({ showLoginModal: false })}
        />
        <Navbar
          style={{
            padding: "12px",
            backgroundImage: `linear-gradient(${colors.yaDevBlue}, ${colors.yaDevPurple})`,
            borderBottom: "3px solid black",
          }}
        >
          <Navbar.Brand
            href="#"
            onClick={() => this.props.history.push('/')}
          >
            <FaGamepad className="brand" /> <span className="brand"> YaDev </span> |
          </Navbar.Brand>
          {
            this.state.loggedIn &&
            <MessageButton
              style={{ marginLeft: "1rem", height: "100%" }}
              messages={this.state.messages}
              onMessageClick={this.onMessageClick.bind(this)}
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
        </Navbar>
      </div>
    )
  }
}

export default withRouter(MainNav);
