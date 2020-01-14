import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import * as colors from '../../colors';
import GlobalNotificationManager from '../../gnm';
import MessageList, { MessageBox } from '../lists/messagelist';
import PostList from '../lists/PostList';
import { userToken, getTokenInfo } from '../../utils';
import { getConversation, getUser, sendMessage, getUsersPosts } from '../../calls';

class BrokerPage extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            selectedMessage: {},
            selectedMessageUser: {},
            otherUsersPosts: []
        }

        this.setSelectedMessage = this.setSelectedMessage.bind(this);
    }

    componentDidMount() {
        const currUser = getTokenInfo();
        const {
            to,
            from
        } = this.props.match.params;

        const otherUser = from === currUser._id ? to : from;

        getUsersPosts(otherUser)
            .then(res => {
                this.setState({
                    otherUsersPosts: res.data.results
                })
            })
            .catch(err => {
                GlobalNotificationManager.push('alert', { 
                    msg: "Failed to get other user's posts", ok: false 
                })
            })

        getConversation(to, from, userToken())
        .then(res => {
            this.setState({
                messages: res.data.results
            })

            if (this.state.messages.length > 0) {
                this.setSelectedMessage(this.state.messages[0])
            }
        })
        .catch(err => {
            GlobalNotificationManager.push('alert', { 
                msg: "Failed to get conversation", ok: false 
            })
        })
    }

    setSelectedMessage(msg) {
        const currUser = getTokenInfo();
        const {
            receiver,
            sender
        } = msg;

        // NOTE: Determines who isn't the current user in this conversation.
        const otherUser = sender === currUser._id ? receiver : sender;

        getUser(otherUser)
        .then(res => {
            this.setState({
                selectedMessageUser: res.data
            })
        })
        .catch(err => {
            GlobalNotificationManager.push('alert', { 
                msg: "Failed to grab user data.", ok: false 
            })
        })

        this.setState({
            selectedMessage: msg
        })
    }

    sendMessage(msg) {
        const {
            to,
            from
        } = this.props.match.params;

        sendMessage(from, to, msg, userToken())
            .then(res => {
                const messages = [res.data, ...this.state.messages]
                this.setState({ messages })
            })
            .catch(err => {
                GlobalNotificationManager.push('alert', { 
                    msg: "Failed to send message!", ok: false 
                })
            })
    }

    render() {
        return (
            <Container fluid style={{height: "100%"}}>
                <Row>
                    <Col sm={7}>
                        <Row>
                            <div
                                style={{
                                    width: "100%",
                                    padding: "1rem",
                                    borderRadius: "2rem",
                                    textAlign: "center"
                                }}
                            >
                                <h3 style={{
                                        padding: "0rem 1rem .3rem 1rem"
                                    }}
                                >
                                    <span style={{ color: colors.yaDevPurple }}>{ this.state.selectedMessageUser.username }</span>'s Posts:
                                </h3>
                            </div>
                        </Row>
                        <PostList
                            posts={this.state.otherUsersPosts}
                        />
                    </Col>
                    <Col xs={12} sm={5}>
                        <Row>
                            <div
                                style={{
                                    width: "100%",
                                    padding: "1rem",
                                    borderRadius: "2rem",
                                    textAlign: "center"
                                }}
                            >
                                <h3 style={{
                                        padding: "0rem 1rem .3rem 1rem"
                                    }}
                                >
                                    Talking to <span style={{ color: colors.yaDevPurple }}>{ this.state.selectedMessageUser.username }</span>:
                                </h3>
                                <div>
                                    <Badge variant="info">
                                        Completed: { this.state.selectedMessageUser.completed } 
                                    </Badge>
                                </div>
                            </div>
                        </Row>
                        <MessageBox
                            style={{marginBottom: "12px"}}
                            onSubmit={this.sendMessage.bind(this)}
                        />
                        <MessageList
                            messages={this.state.messages}
                            selectedMessage={this.setSelectedMessage}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BrokerPage;