import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './LoginModal';
import Form from 'react-bootstrap/Form';
import YouDevButton from './YouDevButton';
import PostModal from './PostModal';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import GlobalNotificationManager from '../gnm';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import { withRouter } from 'react-router-dom';
import { logout, userToken, getTokenInfo, messageToConversation } from '../utils';
import { getMessages } from '../calls';

const MAX_MESSAGE_PREVIEW_LENGTH = 45;

class MessageTab extends React.Component {
    constructor() {
        super();
    }

    render() {
        const msg = this.props.message.message.length > MAX_MESSAGE_PREVIEW_LENGTH ? 
            this.props.message.message.substring(0,MAX_MESSAGE_PREVIEW_LENGTH-3) + "..." :
                this.props.message.message

        return (
            <div>
                <p> {msg} </p>
            </div>
        )
    }
}

class MessageButton extends React.Component {
    constructor() {
        super();
    }

    getTitle() {
        return (
            <span>
                Messages 
                <Badge 
                    variant={this.props.messages && this.props.messages.length > 0 ? "danger" : "dark"}
                    style={{marginLeft: ".3rem", marginRight: ".1rem"}}
                >
                    {
                        this.props.messages && this.props.messages.filter(msg => {
                            return !msg.read
                        }).length
                    }
                </Badge>
            </span>
        )
    }

    render() {
        const conversations = {};

        return (
            <YouDevButton
                subtype="dropdown"
                title={this.getTitle()}
            >
                <Dropdown.Item
                    disabled
                    style={{color: "black"}}
                >
                    <h5>Messages:</h5>
                </Dropdown.Item>
                <hr />
                {
                    this.props.messages && messageToConversation(this.props.messages).map((msg, i) => {
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
            </YouDevButton>
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

        history.push('/')

        this.setState({
            loggedIn: false
        })
    }

    getMessages() {
        // don't attempt to grab messages if the user isn't even logged in
        if (!getTokenInfo()) return;

        const userId = getTokenInfo()._id
        const token = userToken()

        getMessages(userId, token)
        .then(res => {
            this.setState({
                messages: res.data.results
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
                    style={{marginLeft: "1rem"}}
                    onClick={() => this.logout()}
                    text="Logout"
                />
            )
        } else {
            return (
                <YouDevButton
                    style={{marginLeft: "1rem"}}
                    onClick={() => this.setState({showLoginModal: !this.state.showLoginModal})}
                    text="Login"
                />
            )
        }
    }

    addAlert(text, success=true) {
      let alerts = this.state.alerts;
      alerts.push(
          <Alert
            key={text}
            onClick={this.onAlertClick.bind(this)}
            onMouseEnter={this.onHoverAlert.bind(this)}
            onMouseLeave={this.onLeaveHoverAlert.bind(this)}
            style={{width: "100%", margin: "0px", textAlign: "center"}}
            variant={success ? "success" : "danger"}
          >
            { text } <strong> ( Click to remove ) </strong>
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

    onHoverAlert(e) { }

    onLeaveHoverAlert(e) { }

    render() {
        return (
          <div>
            <Row>
              { this.state.alerts } 
            </Row>
            <Navbar expand="lg" style={{backgroundImage: "linear-gradient(#A1D9FF, #CEA1FF)", borderBottom: "3px solid black"}}>
                <Navbar.Brand href="/">
                    <h2>
                        YaDev
                    </h2>
                </Navbar.Brand>
                <LoginModal
                    show={this.state.showLoginModal}
                    onHide={() => this.setState({showLoginModal: false})}
                />
                <PostModal
                    show={this.state.showPostModal}
                    onHide={() => this.setState({showPostModal: false})}
                    onPost={this.onPostSuccess.bind(this)}
                    onPostError={this.onPostError.bind(this)}
                />
                <Form inline>
                    {
                        this.state.loggedIn && 
                        <MessageButton
                            messages={this.state.messages}
                            onMessageClick={this.onMessageClick.bind(this)}
                        />
                    }
                    {
                        this.state.loggedIn && 
                        <YouDevButton
                            style={{marginLeft: "1rem"}}
                            text="Make Post"
                            onClick={() => this.setState({showPostModal: true})}
                        />
                    }
                    {this.getAccountButton()}
                </Form>
            </Navbar>
          </div>
        )
    }
}

export default withRouter(MainNav);
